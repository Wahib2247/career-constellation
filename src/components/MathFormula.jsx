import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Renders a LaTeX math formula using KaTeX.
 * Falls back to plain text if the expression is not valid LaTeX.
 *
 * @param {string} formula  - Raw LaTeX string, e.g. "\\int_{0}^{t} f(x)dx"
 * @param {boolean} display - true = display (block) mode, false = inline mode
 * @param {string} className - extra Tailwind classes for the wrapper
 */
const MathFormula = ({ formula = "", display = true, className = "" }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current || !formula) return;

        try {
            katex.render(formula, ref.current, {
                displayMode: display,
                throwOnError: false,
                trust: true,
                output: "html",
                strict: "ignore",
            });
        } catch {
            // Fallback: render as plain pre-formatted text
            ref.current.textContent = formula;
        }
    }, [formula, display]);

    return (
        <span
            ref={ref}
            className={`katex-render ${className}`}
        />
    );
};

export default MathFormula;
