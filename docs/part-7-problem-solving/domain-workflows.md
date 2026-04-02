---
title: ""Domain Workflows: Finance, Legal, HR, Sales Agents""
description: Building AI agents for specific business domains with real-world requirements
---

# Domain Workflows: Finance, Legal, HR, Sales Agents

Generic AI agents are impressive. Domain-specific AI agents are transformative. When you build an agent that understands the specific requirements, constraints, and workflows of a business domain, you create real value.

This chapter walks through building AI agents for four high-value domains: finance, legal, HR, and sales. Each has unique requirements, and each demonstrates different aspects of agent design.

## Finance Agent

### Domain Requirements

- **Accuracy:** Financial calculations must be exact
- **Compliance:** Regulatory requirements (SOX, GDPR, PCI DSS)
- **Audit trail:** Every action must be logged and traceable
- **Security:** Financial data is highly sensitive
- **Risk management:** Errors can have severe consequences

### Agent Architecture

```python
class FinanceAgent:
    def __init__(self):
        self.tools = [
            MarketDataTool(),      # Real-time market data
            CalculatorTool(),      # Precise calculations
            ComplianceChecker(),   # Regulatory compliance
            AuditLogger(),         # Immutable audit trail
            RiskAssessor(),        # Risk analysis
        ]
        self.guardrails = [
            InputValidator(),      # Validate all inputs
            OutputVerifier(),      # Verify all calculations
            ComplianceGate(),      # Block non-compliant actions
            HumanApproval(),       # Require approval for trades
        ]
    
    def analyze_investment(self, symbol: str, amount: float) -> dict:
        """Analyze an investment opportunity."""
        # Step 1: Gather data
        market_data = self.tools[0].fetch(symbol)
        
        # Step 2: Calculate metrics
        metrics = self.tools[1].calculate(market_data)
        
        # Step 3: Assess risk
        risk = self.tools[4].assess(metrics, amount)
        
        # Step 4: Check compliance
        compliance = self.tools[2].check(risk)
        
        # Step 5: Log everything
        self.tools[3].log({
            "symbol": symbol,
            "amount": amount,
            "metrics": metrics,
            "risk": risk,
            "compliance": compliance,
        })
        
        # Step 6: Return recommendation
        return {
            "recommendation": self.generate_recommendation(metrics, risk, compliance),
            "risk_level": risk.level,
            "compliance_status": compliance.status,
            "requires_approval": amount > APPROVAL_THRESHOLD,
        }
```

### Key Design Decisions

1. **Deterministic calculations:** Use precise math libraries, not LLMs, for calculations
2. **Human approval:** Require human sign-off for transactions above threshold
3. **Immutable audit trail:** Every action is logged with timestamp and user
4. **Compliance first:** Compliance checks block non-compliant actions

## Legal Agent

### Domain Requirements

- **Precision:** Legal language must be exact
- **Completeness:** All relevant clauses and precedents must be considered
- **Citation:** Every claim must be supported by source material
- **Confidentiality:** Legal documents are privileged
- **Liability:** Errors can have legal consequences

### Agent Architecture

```python
class LegalAgent:
    def __init__(self):
        self.tools = [
            DocumentParser(),       # Parse legal documents
            ClauseExtractor(),      # Extract key clauses
            PrecedentSearcher(),    # Find relevant case law
            ComplianceChecker(),    # Check regulatory compliance
            CitationGenerator(),    # Generate proper citations
        ]
    
    def review_contract(self, document: str) -> dict:
        """Review a legal contract for risks and compliance."""
        # Step 1: Parse document
        parsed = self.tools[0].parse(document)
        
        # Step 2: Extract clauses
        clauses = self.tools[1].extract(parsed)
        
        # Step 3: Check each clause
        findings = []
        for clause in clauses:
            risk = self.ass_clause_risk(clause)
            precedent = self.tools[2].search(clause.type)
            compliance = self.tools[3].check(clause)
            
            findings.append({
                "clause": clause.text,
                "risk_level": risk.level,
                "precedent": precedent,
                "compliance": compliance.status,
                "recommendation": risk.recommendation,
            })
        
        # Step 4: Generate report with citations
        report = self.tools[4].generate(findings)
        
        return {
            "report": report,
            "risk_summary": self.summarize_risks(findings),
            "action_items": self.extract_action_items(findings),
        }
    
    def assess_clause_risk(self, clause) -> RiskAssessment:
        """Assess the risk level of a contract clause."""
        # Use LLM for analysis but verify against rules
        llm_assessment = llm.analyze_risk(clause.text)
        rule_based_check = rules.check(clause)
        
        # Combine LLM and rule-based assessment
        return RiskAssessment.combine(llm_assessment, rule_based_check)
```

### Key Design Decisions

1. **Hybrid analysis:** Combine LLM reasoning with rule-based verification
2. **Citation requirement:** Every finding must cite source material
3. **Risk categorization:** Classify risks by severity and type
4. **Human review:** All findings require attorney review before action

## HR Agent

### Domain Requirements

- **Fairness:** Must avoid bias in all decisions
- **Privacy:** Employee data is highly sensitive
- **Compliance:** Labor laws, anti-discrimination regulations
- **Empathy:** HR interactions require emotional intelligence
- **Documentation:** All decisions must be documented

### Agent Architecture

```python
class HRAgent:
    def __init__(self):
        self.tools = [
            ResumeParser(),         # Parse candidate resumes
            SkillMatcher(),         # Match skills to requirements
            BiasDetector(),         # Check for biased language
            PolicyChecker(),        # Check HR policy compliance
            CommunicationHelper(),  # Draft empathetic communications
        ]
    
    def screen_candidate(self, resume: str, job_description: str) -> dict:
        """Screen a candidate against job requirements."""
        # Step 1: Parse resume
        candidate = self.tools[0].parse(resume)
        
        # Step 2: Match skills
        match = self.tools[1].match(candidate, job_description)
        
        # Step 3: Check for bias
        bias_check = self.tools[2].analyze(candidate, job_description)
        
        # Step 4: Policy compliance
        policy_check = self.tools[3].check(job_description)
        
        # Step 5: Generate assessment
        assessment = {
            "skill_match": match.score,
            "strengths": match.strengths,
            "gaps": match.gaps,
            "bias_risk": bias_check.risk_level,
            "policy_compliant": policy_check.compliant,
            "recommendation": self.generate_recommendation(match, bias_check),
        }
        
        return assessment
    
    def draft_communication(self, context: str, tone: str = "professional") -> str:
        """Draft HR communication with appropriate tone."""
        return self.tools[4].draft(context, tone=tone)
```

### Key Design Decisions

1. **Bias detection:** Every candidate assessment includes bias analysis
2. **Skill-based matching:** Focus on skills, not demographics
3. **Policy compliance:** All job descriptions checked against labor laws
4. **Empathetic communication:** AI drafts are reviewed for tone and sensitivity

## Sales Agent

### Domain Requirements

- **Personalization:** Each interaction must be tailored
- **Timing:** Right message at the right time
- **Context:** Full history of customer interactions
- **Conversion:** Focus on measurable outcomes
- **Compliance:** GDPR, CAN-SPAM, do-not-call regulations

### Agent Architecture

```python
class SalesAgent:
    def __init__(self):
        self.tools = [
            CRMConnector(),         # Access customer data
            ResearchTool(),         # Research prospects
            EmailGenerator(),       # Draft personalized emails
            FollowUpScheduler(),    # Schedule follow-ups
            AnalyticsTracker(),     # Track conversion metrics
        ]
    
    def qualify_lead(self, lead_data: dict) -> dict:
        """Qualify a sales lead."""
        # Step 1: Research the prospect
        research = self.tools[1].research(lead_data["company"])
        
        # Step 2: Score the lead
        score = self.calculate_lead_score(lead_data, research)
        
        # Step 3: Determine next action
        if score >= 80:
            action = "immediate_outreach"
        elif score >= 50:
            action = "nurture_sequence"
        else:
            action = "low_priority"
        
        # Step 4: Generate personalized outreach
        if action == "immediate_outreach":
            email = self.tools[2].generate(lead_data, research)
            self.tools[3].schedule(lead_data["email"], delay=0)
        
        # Step 5: Track
        self.tools[4].track(lead_data["id"], score, action)
        
        return {
            "score": score,
            "action": action,
            "email": email if action == "immediate_outreach" else None,
            "reasoning": self.explain_score(score, lead_data, research),
        }
```

### Key Design Decisions

1. **Data-driven scoring:** Lead scores based on multiple factors
2. **Personalization:** Each outreach is tailored to the specific prospect
3. **Automated follow-up:** Schedule follow-ups based on engagement
4. **Analytics tracking:** Every interaction tracked for optimization

## Cross-Domain Principles

### Principle 1: Domain Knowledge Is Essential

Each domain has specific knowledge requirements. Build knowledge bases that agents can access.

### Principle 2: Human Oversight Is Non-Negotiable

High-stakes domains require human review. AI assists, humans decide.

### Principle 3: Compliance Is Built In, Not Added On

Compliance checks are part of the agent's core logic, not an afterthought.

### Principle 4: Audit Trails Are Mandatory

Every action, decision, and output must be logged and traceable.

### Principle 5: Error Handling Is Critical

Domain-specific agents must handle errors gracefully and escalate appropriately.

## End-of-Chapter Checklist

- [ ] I understand the unique requirements of finance, legal, HR, and sales domains
- [ ] I can build domain-specific agents with appropriate tools and guardrails
- [ ] I implement hybrid analysis (LLM + rule-based) for critical domains
- [ ] I build in human oversight, compliance checks, and audit trails
- [ ] I follow the five cross-domain principles

## What's Next

Domain agents solve specific problems. The next chapter shows you how to combine all your skills into a cohesive 10x workflow — the AI-DLC (Developer Lifecycle) in practice.

**Next:** [The 10x Developer Workflow: AI-DLC in Practice](./ten-x-workflow)
