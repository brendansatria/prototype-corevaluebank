export interface MetricImpacts {
  revenue: number;
  risk: number;
  customerSatisfaction: number;
}

export interface DilemmaOption {
  text: string;
  impacts: MetricImpacts;
  feedback: string;
}

export interface Dilemma {
  scenario: string;
  easy: DilemmaOption[];
  medium: DilemmaOption[];
  hard: DilemmaOption[];
}

export interface GameRound {
  round: number;
  coreValue: 'Integrity' | 'Collaboration' | 'Accountability' | 'Growth Mindset' | 'Customer Focus';
  department: string;
  dilemma: Dilemma;
}

export const GAME_ROUNDS: GameRound[] = [
  {
    round: 1,
    coreValue: 'Integrity',
    department: 'Customer Service Department',
    dilemma: {
      scenario: "A long-time customer requests to expedite a $50,000 transfer, but their documentation is incomplete. They insist it’s urgent and promise to provide the paperwork later. How do you proceed?",
      easy: [
        { text: "Process the transfer after verifying identity quickly, trusting the customer’s promise.", impacts: { revenue: 5, risk: -3, customerSatisfaction: 2 }, feedback: "Expediting boosts revenue and customer satisfaction but compromises integrity, increasing risk." },
        { text: "Require full documentation before processing, explaining the need for compliance.", impacts: { revenue: -2, risk: 5, customerSatisfaction: 1 }, feedback: "Upholding integrity reduces risk but delays revenue, maintaining customer trust. Requiring documentation shows Integrity by prioritizing compliance." },
      ],
      medium: [
        { text: "Process immediately to keep the customer happy.", impacts: { revenue: 5, risk: -5, customerSatisfaction: 3 }, feedback: "This prioritizes short-term satisfaction over security." },
        { text: "Offer a temporary solution while awaiting documentation.", impacts: { revenue: 2, risk: 2, customerSatisfaction: 2 }, feedback: "A temporary solution shows Integrity by balancing compliance and customer needs." },
        { text: "Refuse until full documentation, citing policy.", impacts: { revenue: -3, risk: 5, customerSatisfaction: -1 }, feedback: "This strictly adheres to policy, ensuring high integrity but risking customer relationship." },
      ],
      hard: [
        { text: "Process immediately to avoid escalation.", impacts: { revenue: 7, risk: -7, customerSatisfaction: 4 }, feedback: "Avoiding conflict at the cost of integrity is a major risk." },
        { text: "Process after cursory check.", impacts: { revenue: 4, risk: -4, customerSatisfaction: 3 }, feedback: "A cursory check is better than nothing, but still a significant risk." },
        { text: "Delay until documentation is complete.", impacts: { revenue: -4, risk: 6, customerSatisfaction: -2 }, feedback: "Delaying the transfer demonstrates Integrity by prioritizing compliance above all." },
        { text: "Escalate to a manager.", impacts: { revenue: -2, risk: 3, customerSatisfaction: -3 }, feedback: "Escalating shows responsibility, but can frustrate the customer and delay resolution." },
      ]
    }
  },
  {
    round: 2,
    coreValue: 'Collaboration',
    department: 'Operations Department',
    dilemma: {
      scenario: "The Operations Department is rolling out a new transaction system. IT needs more time to test, but Compliance insists on meeting the deadline. How do you proceed?",
      easy: [
        { text: "Organize a joint meeting with IT and Compliance to align on a plan.", impacts: { revenue: 3, risk: 4, customerSatisfaction: 3 }, feedback: "Collaboration ensures a tested system, reducing risk and boosting efficiency. A joint meeting shows Collaboration by uniting teams." },
        { text: "Push IT to meet the deadline without consulting Compliance.", impacts: { revenue: 5, risk: -3, customerSatisfaction: 1 }, feedback: "Lack of collaboration risks errors but speeds up revenue." },
      ],
      medium: [
        { text: "Facilitate a workshop to resolve conflicts.", impacts: { revenue: 3, risk: 5, customerSatisfaction: 2 }, feedback: "A workshop demonstrates Collaboration by aligning teams." },
        { text: "Let teams resolve independently, set deadline.", impacts: { revenue: 4, risk: -2, customerSatisfaction: 1 }, feedback: "This approach lacks proactive collaboration and can lead to unresolved issues." },
        { text: "Delay rollout, ignore Compliance.", impacts: { revenue: -3, risk: 3, customerSatisfaction: -2 }, feedback: "Ignoring a key department is the opposite of collaboration." },
      ],
      hard: [
        { text: "Host emergency cross-team meeting.", impacts: { revenue: 2, risk: 6, customerSatisfaction: 2 }, feedback: "An emergency meeting shows Collaboration under pressure." },
        { text: "Prioritize IT, push Compliance to approve.", impacts: { revenue: 4, risk: -4, customerSatisfaction: 3 }, feedback: "Forcing a decision undermines collaborative trust." },
        { text: "Let teams work independently.", impacts: { revenue: 5, risk: -6, customerSatisfaction: -1 }, feedback: "This leads to silos and significant unmanaged risk." },
        { text: "Postpone rollout indefinitely.", impacts: { revenue: -5, risk: 4, customerSatisfaction: -3 }, feedback: "While safe, this decision stalls progress and indicates a failure to collaborate on a solution." },
      ]
    }
  },
  {
    round: 3,
    coreValue: 'Accountability',
    department: 'Risk Management Department',
    dilemma: {
      scenario: "A minor data breach occurred due to an employee error. It's unlikely to be noticed externally. What is your next step?",
      easy: [
        { text: "Report it internally and follow protocol.", impacts: { revenue: -1, risk: 5, customerSatisfaction: 0 }, feedback: "Taking accountability builds trust and strengthens security." },
        { text: "Ignore it to avoid negative attention.", impacts: { revenue: 0, risk: -5, customerSatisfaction: 0 }, feedback: "Hiding mistakes creates massive future risks." },
      ],
      medium: [
        { text: "Report it and lead the response team.", impacts: { revenue: -1, risk: 6, customerSatisfaction: 1 }, feedback: "Leading the response shows strong accountability." },
        { text: "Quietly fix the issue without a formal report.", impacts: { revenue: 0, risk: -3, customerSatisfaction: 0 }, feedback: "Fixing it is good, but lack of reporting shows poor accountability." },
        { text: "Blame the system to protect the employee.", impacts: { revenue: 0, risk: -6, customerSatisfaction: -2 }, feedback: "Shifting blame is the opposite of accountability." },
      ],
      hard: [
        { text: "Report it, inform affected clients proactively.", impacts: { revenue: -3, risk: 7, customerSatisfaction: -2 }, feedback: "Full transparency, while costly, is the highest form of accountability." },
        { text: "Report internally, but downplay the severity.", impacts: { revenue: 0, risk: -2, customerSatisfaction: 0 }, feedback: "Downplaying the issue is a failure of accountability." },
        { text: "Launch an internal investigation to find who to blame.", impacts: { revenue: -1, risk: -4, customerSatisfaction: -3 }, feedback: "A blame culture is toxic and not true accountability." },
        { text: "Wait to see if anyone notices.", impacts: { revenue: 0, risk: -8, customerSatisfaction: 0 }, feedback: "This is a severe breach of accountability." },
      ]
    }
  },
  {
    round: 4,
    coreValue: 'Growth Mindset',
    department: 'Product Development',
    dilemma: {
      scenario: "A new product launch failed to meet its targets. The team is demoralized. How do you respond?",
      easy: [
        { text: "Organize a 'lessons learned' session to analyze and improve.", impacts: { revenue: 0, risk: 2, customerSatisfaction: 1 }, feedback: "This fosters a Growth Mindset by treating failure as a learning opportunity." },
        { text: "Scrap the project and move on to the next thing.", impacts: { revenue: -2, risk: -2, customerSatisfaction: -1 }, feedback: "Quickly moving on without learning shows a fixed mindset." },
      ],
      medium: [
        { text: "Analyze failure, then pivot the product based on feedback.", impacts: { revenue: 2, risk: 3, customerSatisfaction: 3 }, feedback: "Pivoting shows a Growth Mindset in action." },
        { text: "Publicly take responsibility and protect the team.", impacts: { revenue: -1, risk: 1, customerSatisfaction: 2 }, feedback: "Good leadership, but must be paired with learning." },
        { text: "Find the team members responsible for the failure.", impacts: { revenue: -2, risk: -3, customerSatisfaction: -3 }, feedback: "Blame culture stifles growth." },
      ],
      hard: [
        { text: "Host a workshop on 'failing forward' and re-launch with a new strategy.", impacts: { revenue: 3, risk: 4, customerSatisfaction: 4 }, feedback: "This embodies a strong Growth Mindset." },
        { text: "Re-assign team members to different projects.", impacts: { revenue: -3, risk: -1, customerSatisfaction: -2 }, feedback: "Breaking up the team avoids the learning opportunity." },
        { text: "Cut the budget for 'experimental' projects.", impacts: { revenue: 1, risk: -5, customerSatisfaction: -4 }, feedback: "This punishes innovation and discourages a Growth Mindset." },
        { text: "Ignore the results and focus on other successful products.", impacts: { revenue: 0, risk: -4, customerSatisfaction: -2 }, feedback: "Ignoring failure prevents growth." },
      ]
    }
  },
  {
    round: 5,
    coreValue: 'Customer Focus',
    department: 'Marketing Department',
    dilemma: {
      scenario: "A competitor launched a popular new feature. Your team can quickly copy it, or spend more time developing a unique, customer-researched alternative. What's the plan?",
      easy: [
        { text: "Copy the competitor's feature quickly.", impacts: { revenue: 3, risk: -1, customerSatisfaction: 1 }, feedback: "Fast-following can be effective, but isn't truly customer-focused." },
        { text: "Invest in research to build something better for your customers.", impacts: { revenue: 1, risk: 2, customerSatisfaction: 5 }, feedback: "True Customer Focus means understanding and solving their unique problems." },
      ],
      medium: [
        { text: "Launch a basic version now and iterate with customer feedback.", impacts: { revenue: 2, risk: 1, customerSatisfaction: 4 }, feedback: "This is a good balance, showing customer focus through iteration." },
        { text: "Run a marketing campaign to highlight your existing features.", impacts: { revenue: 1, risk: 0, customerSatisfaction: -2 }, feedback: "This ignores the customer's new expectations." },
        { text: "Copy the feature but brand it differently.", impacts: { revenue: 3, risk: -1, customerSatisfaction: 0 }, feedback: "This is a surface-level solution, not deep customer focus." },
      ],
      hard: [
        { text: "Create a customer advisory board to co-design the new feature.", impacts: { revenue: 2, risk: 3, customerSatisfaction: 7 }, feedback: "Co-design is an excellent example of deep Customer Focus." },
        { text: "Quickly copy the feature and cut prices to compete.", impacts: { revenue: 4, risk: -3, customerSatisfaction: 1 }, feedback: "Competing on price, not value, is often not a customer-focused long-term strategy." },
        { text: "Dismiss the competitor's feature as a fad.", impacts: { revenue: -2, risk: -4, customerSatisfaction: -5 }, feedback: "Dismissing customer trends shows a lack of customer focus." },
        { text: "Survey customers on what they want, then build it.", impacts: { revenue: 2, risk: 2, customerSatisfaction: 6 }, feedback: "This is a solid, customer-focused approach." },
      ]
    }
  }
];

export const TARGET_SCORE = 50;