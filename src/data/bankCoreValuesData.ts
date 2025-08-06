export type CoreValue = 'Integrity' | 'Collaboration' | 'Accountability' | 'Growth Mindset' | 'Customer Focus';
export type Metric = 'revenue' | 'risk' | 'customerSatisfaction';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MetricImpact {
  revenue: number;
  risk: number;
  customerSatisfaction: number;
}

export interface Choice {
  text: string;
  outcome: MetricImpact;
  feedback: string;
}

export interface EventScenario {
  scenario: (difficulty: Difficulty) => string;
  choices: Record<Difficulty, Choice[]>;
}

export interface RoundData {
  round: number;
  coreValue: CoreValue;
  department: string;
  event: EventScenario;
}

export const GAME_ROUNDS: RoundData[] = [
  // Round 1: Integrity
  {
    round: 1,
    coreValue: 'Integrity',
    department: 'Customer Service Department',
    event: {
      scenario: (difficulty) => {
        let base = "A long-time customer requests to expedite a $50,000 transfer, but their documentation is incomplete. They insist it’s urgent and promise to provide the paperwork later.";
        if (difficulty === 'medium') base += " The customer is getting frustrated and is threatening to take their business elsewhere.";
        if (difficulty === 'hard') base += " This is a high-profile client who is now threatening to escalate this to senior management.";
        return base;
      },
      choices: {
        easy: [
          { text: 'Process the transfer after verifying identity quickly, trusting the customer’s promise.', outcome: { revenue: 5, risk: -3, customerSatisfaction: 2 }, feedback: 'Expediting boosts revenue and customer satisfaction but compromises integrity, increasing risk.' },
          { text: 'Require full documentation before processing, explaining the need for compliance.', outcome: { revenue: -2, risk: 5, customerSatisfaction: 1 }, feedback: 'Upholding integrity reduces risk but slightly delays revenue, ultimately maintaining long-term customer trust.' },
        ],
        medium: [
          { text: 'Process immediately to keep the customer happy.', outcome: { revenue: 5, risk: -5, customerSatisfaction: 3 }, feedback: 'While this keeps the customer happy in the short term, it ignores compliance and introduces significant risk.' },
          { text: 'Offer a temporary, smaller transfer while awaiting full documentation.', outcome: { revenue: 2, risk: 2, customerSatisfaction: 2 }, feedback: 'A temporary solution shows integrity by balancing compliance with customer needs, a good compromise.' },
          { text: 'Refuse any action until full documentation is provided, citing policy.', outcome: { revenue: -3, risk: 5, customerSatisfaction: -1 }, feedback: 'This is the most secure option but risks alienating the customer due to its inflexibility.' },
        ],
        hard: [
          { text: 'Process immediately to avoid escalation.', outcome: { revenue: 7, risk: -7, customerSatisfaction: 4 }, feedback: 'Caving to pressure leads to high revenue and satisfaction now, but at a massive risk to the bank.' },
          { text: 'Process after a cursory verbal check with the customer.', outcome: { revenue: 4, risk: -4, customerSatisfaction: 3 }, feedback: 'A cursory check is better than nothing, but still falls short of proper procedure and carries significant risk.' },
          { text: 'Firmly but politely delay the transfer until documentation is complete.', outcome: { revenue: -4, risk: 6, customerSatisfaction: -2 }, feedback: 'This is the correct choice for integrity, though it has negative short-term consequences.' },
          { text: 'Escalate to a manager immediately.', outcome: { revenue: -2, risk: 3, customerSatisfaction: -3 }, feedback: 'Escalating can be appropriate, but in this case, it passes responsibility and can frustrate the customer further.' },
        ],
      },
    },
  },
  // Round 2: Collaboration
  {
    round: 2,
    coreValue: 'Collaboration',
    department: 'Operations Department',
    event: {
      scenario: (difficulty) => {
        let base = "The Operations Department is rolling out a new transaction system. IT needs more time to test, but Compliance insists on meeting the deadline.";
        if (difficulty === 'medium') base += " IT is reporting that rushing could lead to major bugs, while Compliance is raising concerns about regulatory fines if the deadline is missed.";
        if (difficulty === 'hard') base += " Tensions are high, and both teams are blaming each other for potential failure. The project is on the verge of chaos.";
        return base;
      },
      choices: {
        easy: [
          { text: 'Organize a joint meeting with IT and Compliance to align on a revised plan.', outcome: { revenue: 3, risk: 4, customerSatisfaction: 3 }, feedback: 'Excellent! Collaboration ensures a tested, compliant system, reducing risk and boosting long-term efficiency.' },
          { text: 'Push IT to meet the deadline to satisfy Compliance.', outcome: { revenue: 5, risk: -3, customerSatisfaction: 1 }, feedback: 'Lack of collaboration risks system errors and unhappy customers, even if it meets the deadline.' },
        ],
        medium: [
          { text: 'Facilitate a structured workshop for both teams to find a compromise.', outcome: { revenue: 3, risk: 5, customerSatisfaction: 2 }, feedback: 'A workshop is a great way to demonstrate collaboration and find a solution that balances all concerns.' },
          { text: 'Tell both teams to sort it out themselves and stick to the original deadline.', outcome: { revenue: 4, risk: -2, customerSatisfaction: 1 }, feedback: 'This hands-off approach avoids immediate conflict but fosters resentment and increases project risk.' },
          { text: 'Side with IT and delay the rollout, ignoring Compliance\'s warnings.', outcome: { revenue: -3, risk: 3, customerSatisfaction: -2 }, feedback: 'Siding with one team over another undermines collaboration and can have serious regulatory or technical consequences.' },
        ],
        hard: [
          { text: 'Host an emergency, mandatory cross-team meeting to force a resolution.', outcome: { revenue: 2, risk: 6, customerSatisfaction: 2 }, feedback: 'Under pressure, decisive leadership to enforce collaboration is key to mitigating the highest risks.' },
          { text: 'Prioritize the deadline and force IT to cut testing corners.', outcome: { revenue: 4, risk: -4, customerSatisfaction: -3 }, feedback: 'This path leads to a buggy system, damaging customer trust and creating more work later.' },
          { text: 'Let the teams work independently and hope for the best.', outcome: { revenue: 5, risk: -6, customerSatisfaction: -1 }, feedback: 'Hoping for the best is not a strategy. This lack of intervention will almost certainly lead to failure.' },
          { text: 'Postpone the project indefinitely to avoid more conflict.', outcome: { revenue: -5, risk: 4, customerSatisfaction: -3 }, feedback: 'Postponing avoids immediate risk but kills revenue potential and signals poor leadership.' },
        ],
      },
    },
  },
  // NOTE: Rounds 3-5 are placeholders and will be implemented later.
  { round: 3, coreValue: 'Accountability', department: '...', event: { scenario: () => '', choices: { easy: [], medium: [], hard: [] } } },
  { round: 4, coreValue: 'Growth Mindset', department: '...', event: { scenario: () => '', choices: { easy: [], medium: [], hard: [] } } },
  { round: 5, coreValue: 'Customer Focus', department: '...', event: { scenario: () => '', choices: { easy: [], medium: [], hard: [] } } },
];

export const INITIAL_METRICS: MetricImpact = {
  revenue: 0,
  risk: 0,
  customerSatisfaction: 0,
};

export const TARGET_METRICS: MetricImpact = {
  revenue: 50,
  risk: 50,
  customerSatisfaction: 50,
};

export const BANKING_ICONS = ['💳', '💰', '🏧', '📊', '💵', '🔒', '📋', '💎'];