(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.HarnessParserHeuristic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SIGNALS = {
    outputDiscipline: /(code only|only the code|no explanation|no intro|no outro|just answer|one sentence|exactly \d+|bullet points?|wrong format|too much filler|overexplain|overexplaining)/i,
    trust: /(hallucinat|unsupported|fake certainty|not sure|source|assumption|canon|invent|unverified|evidence boundary|known facts?|unknowns?)/i,
    restart: /(start(?:ed)? over|restart|from scratch|rediscover|summarize the whole project|continue.*where we left off)/i,
    drift: /(drift|lost the plot|ignored|forgot|constraints|wrong problem|missed the point)/i,
    layered: /(handoff|current state|project state|multiple constraints|must not change|preserve continuity|shared reality)/i,
    repeatedFailure: /(keeps? doing|repeated|still ignored|second time|third time|already corrected|corrected this twice)/i
  };

  function estimateTokens(text) {
    const value = String(text || '');
    const words = value.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(Math.ceil(value.length / 4), Math.ceil(words * 1.33));
  }

  function detectSignals(text) {
    const value = String(text || '');
    return Object.fromEntries(Object.entries(SIGNALS).map(([name, pattern]) => [name, pattern.test(value)]));
  }

  function recommend(text) {
    const tokenEstimate = estimateTokens(text);
    const signals = detectSignals(text);
    const reasons = [];
    let mode = 'direct';
    let failure = 'Visible correction';
    let confidence = 'medium';

    if (signals.outputDiscipline && tokenEstimate < 250 && !signals.trust && !signals.restart && !signals.layered && !signals.repeatedFailure) {
      mode = 'direct';
      failure = 'Output-format violation';
      confidence = 'high';
      reasons.push('Short output-boundary failure; Direct avoids adding more formatting noise.');
    } else if (signals.trust) {
      mode = 'full';
      failure = 'Trust or evidence-boundary failure';
      confidence = 'high';
      reasons.push('Source, assumption, or certainty confusion requires explicit trust reconstruction and human review.');
    } else if (signals.restart || signals.layered || signals.repeatedFailure) {
      mode = 'full';
      failure = signals.restart ? 'Restart loop' : 'Continuity failure';
      confidence = 'high';
      reasons.push('Restart, handoff, layered-state, or repeated-correction failure needs shared-reality reconstruction.');
    } else if (signals.drift && tokenEstimate < 900) {
      mode = 'direct';
      failure = 'Lost constraint';
      confidence = 'medium';
      reasons.push('A short visible constraint miss should be corrected directly before escalating.');
    } else if ((signals.outputDiscipline || signals.drift) && tokenEstimate < 1800) {
      mode = 'mini';
      failure = signals.outputDiscipline ? 'Output-format violation' : 'Lost constraints';
      confidence = 'medium';
      reasons.push('Several active boundaries need restating, but the whole conversation does not need rebuilding.');
    } else if (tokenEstimate >= 1800) {
      mode = 'full';
      failure = 'Layered context failure';
      confidence = 'low';
      reasons.push('The failure window is long enough that shared state may need reconstruction.');
    } else {
      reasons.push('No escalation signal detected; start with Direct and move up only if the repair fails.');
    }

    return {
      mode,
      failure,
      tokenEstimate,
      confidence,
      reasons,
      signals,
      disclaimer: 'Heuristic recommendation only. Start with the lightest repair that can solve the failure, and escalate only if it does not hold.'
    };
  }

  return { estimateTokens, detectSignals, recommend };
});
