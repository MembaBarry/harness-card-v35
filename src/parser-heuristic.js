/* Harness Card V3.5.2 parser heuristic
 * Local-only, deterministic, and advisory. This is not AI diagnosis.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.HarnessParserHeuristic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SIGNALS = {
    outputDiscipline: /(code only|only the code|no explanation|no intro|no outro|just answer|one sentence|wrong format|too much filler|overexplain|overexplaining)/i,
    trust: /(hallucinat|unsupported|fake certainty|not sure|are you sure|source|assumption|canon|invent|unverified)/i,
    restart: /(start(?:ed)? over|restart|from scratch|rediscover|summarize the whole project|continue.*where we left off)/i,
    drift: /(drift|lost the plot|ignored|forgot|constraints|loop|wrong problem|missed the point)/i,
    layered: /(handoff|current state|project state|multiple constraints|must not change|preserve continuity)/i
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
    let mode = 'full';
    let failure = 'Drift';
    let confidence = 'low';

    // Direct must be checked before Mini because its token range is a subset.
    if (signals.outputDiscipline && tokenEstimate < 600 && !signals.trust && !signals.restart && !signals.drift && !signals.layered) {
      mode = 'direct';
      failure = 'Output-format violation';
      confidence = 'high';
      reasons.push('Short, obvious output-boundary failure with no layered context or trust signal.');
    } else if (signals.outputDiscipline && tokenEstimate < 1800 && !signals.trust && !signals.restart && !signals.layered) {
      mode = 'mini';
      failure = 'Output-format violation';
      confidence = signals.drift ? 'medium' : 'high';
      reasons.push('Output-discipline failure needs explicit format restoration but not full context reconstruction.');
    } else if (signals.trust) {
      mode = 'full';
      failure = 'Fake certainty';
      confidence = 'high';
      reasons.push('Trust, source, assumption, or unsupported-certainty signal detected.');
    } else if (signals.restart) {
      mode = 'full';
      failure = 'Restart loop';
      confidence = 'high';
      reasons.push('Restart or continuity-loss signal detected.');
    } else if (signals.drift || signals.layered || tokenEstimate >= 1800) {
      mode = 'full';
      failure = signals.drift ? 'Lost constraints' : 'Drift';
      confidence = signals.drift || signals.layered ? 'medium' : 'low';
      reasons.push('Layered context, lost-constraint, continuity, or long-input signal detected.');
    } else {
      reasons.push('No decisive light-repair pattern detected; Full is the conservative fallback.');
    }

    return {
      mode,
      failure,
      tokenEstimate,
      confidence,
      reasons,
      signals,
      disclaimer: 'Heuristic recommendation only. Review the conversation and choose the lightest repair that can actually solve the failure.'
    };
  }

  return { estimateTokens, detectSignals, recommend };
});
