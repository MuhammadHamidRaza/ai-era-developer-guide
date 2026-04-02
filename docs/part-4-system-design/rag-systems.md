---
title: "RAG Systems: Retrieval-Augmented Generation in Production"
description: How to build production-ready RAG pipelines that deliver accurate, reliable AI responses
---

# RAG Systems: Retrieval-Augmented Generation in Production

Large language models have a fundamental limitation: they only know what they learned during training. They don't know your company's documentation, your product's API, or your customer's history.

Retrieval-Augmented Generation (RAG) solves this by retrieving relevant information from your knowledge base and providing it to the LLM as context. The LLM then generates responses based on both its training and your retrieved information.

RAG is the most practical way to build AI applications that are accurate, up-to-date, and grounded in your specific knowledge. But building RAG that works reliably in production is harder than it looks.

This chapter teaches you to build production-ready RAG systems.

## The RAG Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                     RAG Pipeline                              │
│                                                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐ │
│  │  Ingest  │───▶│  Chunk   │───▶│  Embed   │───▶│  Store  │ │
│  │  Data    │    │  Text    │    │  Vectors │    │  Vector │ │
│  └──────────┘    └──────────┘    └──────────┘    └─────────┘ │
│                                                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐ │
│  │ Generate │◀───│  Augment │◀───│  Retrieve│◀───│  Query  │ │
│  │ Response │    │  Prompt  │    │  Results │    │  Embed  │ │
│  └──────────┘    └──────────┘    └──────────┘    └─────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Step 1: Data Ingestion

### Sources

RAG systems ingest data from multiple sources:

- **Documents:** PDFs, Word docs, Markdown files
- **Web pages:** Documentation sites, wikis, knowledge bases
- **Databases:** Structured data, product catalogs, customer records
- **APIs:** Real-time data from external services
- **Code repositories:** Source code, comments, commit messages

### Ingestion Pipeline

```python
from langchain.document_loaders import (
    PyPDFLoader,
    TextLoader,
    WebBaseLoader,
    DirectoryLoader,
)
from langchain.schema import Document

def ingest_documents(source: str, source_type: str) -> list[Document]:
    """Load documents from various sources."""
    if source_type == "pdf":
        loader = PyPDFLoader(source)
    elif source_type == "text":
        loader = TextLoader(source)
    elif source_type == "web":
        loader = WebBaseLoader(source)
    elif source_type == "directory":
        loader = DirectoryLoader(source, glob="**/*.md")
    else:
        raise ValueError(f"Unsupported source type: {source_type}")
    
    documents = loader.load()
    
    # Add metadata
    for doc in documents:
        doc.metadata["source"] = source
        doc.metadata["source_type"] = source_type
        doc.metadata["ingested_at"] = datetime.utcnow().isoformat()
    
    return documents
```

## Step 2: Text Chunking

### Why Chunking Matters

LLMs have context windows. You can't feed an entire document into a prompt. Chunking breaks documents into manageable pieces.

### Chunking Strategies

```python
from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    SemanticChunker,
    MarkdownHeaderTextSplitter,
)

# Strategy 1: Character-based (simple)
char_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " ", ""],
)

# Strategy 2: Semantic (smarter)
semantic_splitter = SemanticChunker(
    embeddings=OpenAIEmbeddings(),
    breakpoint_threshold_type="percentile",
)

# Strategy 3: Structure-aware (for Markdown)
md_splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=[
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
)
```

### Chunking Best Practices

1. **Overlap chunks** to preserve context across boundaries
2. **Respect document structure** — don't split in the middle of a code block or table
3. **Size appropriately** — too small loses context, too large wastes tokens
4. **Include metadata** — source, section, page number for attribution

## Step 3: Embedding and Storage

### Embedding Models

```python
from langchain.embeddings import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer

# OpenAI embeddings
openai_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Open-source alternative
local_embeddings = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embeddings
chunks = ["chunk 1 text", "chunk 2 text", "chunk 3 text"]
embeddings = openai_embeddings.embed_documents(chunks)
```

### Vector Databases

```python
# PostgreSQL with pgvector
from langchain.vectorstores import PGVector

vectorstore = PGVector.from_documents(
    documents=chunks,
    embedding=openai_embeddings,
    connection_string="postgresql://user:pass@localhost:5432/db",
    collection_name="documentation",
)

# Chroma (local development)
from langchain.vectorstores import Chroma

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=openai_embeddings,
    persist_directory="./chroma_db",
)

# Pinecone (managed, production)
from langchain.vectorstores import Pinecone

vectorstore = Pinecone.from_documents(
    documents=chunks,
    embedding=openai_embeddings,
    index_name="documentation",
)
```

## Step 4: Retrieval

### Basic Retrieval

```python
def retrieve(query: str, top_k: int = 5) -> list[Document]:
    """Retrieve relevant documents for a query."""
    query_embedding = openai_embeddings.embed_query(query)
    results = vectorstore.similarity_search_by_vector(
        query_embedding, k=top_k
    )
    return results
```

### Advanced Retrieval Strategies

```python
# Hybrid search: combine vector similarity with keyword matching
def hybrid_search(query: str, top_k: int = 5) -> list[Document]:
    # Vector search
    vector_results = vectorstore.similarity_search(query, k=top_k)
    
    # Keyword search (BM25)
    keyword_results = bm25_retriever.invoke(query)
    
    # Combine and rerank
    combined = merge_results(vector_results, keyword_results)
    return combined[:top_k]

# Multi-query retrieval: expand the query into multiple variants
from langchain.retrievers.multi_query import MultiQueryRetriever

multi_query_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(temperature=0),
)

# Parent-child retrieval: retrieve small chunks but return parent context
from langchain.retrievers import ParentDocumentRetriever

parent_retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=InMemoryStore(),
    child_splitter=RecursiveCharacterTextSplitter(chunk_size=200),
    parent_splitter=RecursiveCharacterTextSplitter(chunk_size=1000),
)
```

## Step 5: Augmentation and Generation

```python
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

# Define the prompt
prompt = ChatPromptTemplate.from_template("""
You are a helpful assistant that answers questions based on the provided context.

Context:
{context}

Question: {input}

Answer based only on the context above. If the context doesn't contain the answer,
say "I don't have enough information to answer this question."

Answer:
""")

# Create the chain
document_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# Use the chain
response = retrieval_chain.invoke({"input": "How do I reset my password?"})
print(response["answer"])
```

## Production Considerations

### Caching

Cache retrieval results for common queries:

```python
import hashlib
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_retrieve(query: str, top_k: int = 5) -> str:
    """Cache retrieval results for common queries."""
    results = retrieve(query, top_k)
    return serialize_results(results)
```

### Freshness

Keep your vector store up to date:

```python
def update_vector_store():
    """Re-ingest changed documents and update embeddings."""
    # Check for changed documents
    changed = detect_changes(source_dir)
    
    for doc_path in changed:
        # Remove old chunks
        vectorstore.delete_by_metadata({"source": doc_path})
        
        # Ingest new chunks
        documents = ingest_documents(doc_path, "markdown")
        chunks = chunk_documents(documents)
        vectorstore.add_documents(chunks)
```

### Evaluation

Evaluate RAG quality continuously:

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)

# Evaluate RAG responses
results = evaluate(
    dataset=evaluation_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
    llm=ChatOpenAI(model="gpt-4"),
    embeddings=OpenAIEmbeddings(),
)
```

### Monitoring

Monitor RAG system health:

```python
def log_rag_metrics(query: str, results: list, response: str, latency: float):
    """Log RAG system metrics for monitoring."""
    metrics = {
        "query_length": len(query),
        "num_results": len(results),
        "response_length": len(response),
        "latency_ms": latency * 1000,
        "avg_similarity_score": calculate_avg_similarity(query, results),
    }
    monitoring_client.log(metrics)
```

## Common RAG Pitfalls

### Pitfall 1: Poor Chunking

Chunks that are too large waste context window. Chunks that are too small lose context.

**Fix:** Experiment with chunk sizes. Use structure-aware chunking. Include overlap.

### Pitfall 2: Missing Metadata

Without metadata, you can't filter results or provide attribution.

**Fix:** Always include source, section, and timestamp metadata.

### Pitfall 3: Stale Data

RAG is only as good as its knowledge base. Stale data produces stale answers.

**Fix:** Implement automated re-ingestion pipelines. Monitor data freshness.

### Pitfall 4: No Evaluation

Without evaluation, you don't know if your RAG system is working.

**Fix:** Implement continuous evaluation with RAGAS or similar frameworks.

### Pitfall 5: Ignoring Edge Cases

RAG fails silently when no relevant documents are found.

**Fix:** Implement fallback responses and confidence scoring.

## End-of-Chapter Checklist

- [ ] I understand the complete RAG pipeline (ingest, chunk, embed, store, retrieve, augment, generate)
- [ ] I can implement multiple chunking strategies and choose the right one
- [ ] I know how to use different vector databases for different scenarios
- [ ] I can implement advanced retrieval strategies (hybrid, multi-query, parent-child)
- [ ] I've built production considerations: caching, freshness, evaluation, monitoring
- [ ] I avoid the five common RAG pitfalls

## What's Next

RAG systems need evaluation to ensure quality. The next chapter covers evaluation frameworks — DeepEval, Ragas, and production QA.

**Next:** [Evaluation Frameworks: DeepEval, Ragas, and Production QA](./evaluation-frameworks)
