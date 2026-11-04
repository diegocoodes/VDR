import { Reveal } from './reveal';

export function AutomotiveDetails({
  variant = 'bodywork',
}: {
  variant?: 'bodywork' | 'tread' | 'racing';
}) {
  return (
    <Reveal className={`automotive-details automotive-details-${variant}`}>
      <svg
        viewBox="0 0 900 650"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {variant === 'bodywork' ? (
          <>
            <path
              className="bodywork-line"
              pathLength="1000"
              d="M-80 610C240 590 175 180 525 182S840 40 990-80"
            />
            <path
              className="bodywork-line"
              pathLength="1000"
              d="M-60 655C275 625 214 213 548 213S880 65 1030-40"
            />
            <path
              className="bodywork-line bodywork-accent"
              pathLength="1000"
              d="M-30 704C310 661 249 245 578 245S910 100 1070 0"
            />
          </>
        ) : variant === 'tread' ? (
          <g className="tread-pattern">
            {Array.from({ length: 12 }, (_, index) => (
              <g
                key={index}
                transform={`translate(${index * 81 - 90} ${index * 28 - 100}) rotate(25 450 325)`}
              >
                <path d="m320 0 72 60v75l-72-60zm162 60 72-60v75l-72 60z" />
                <path d="m320 160 72 60v75l-72-60zm162 60 72-60v75l-72 60z" />
              </g>
            ))}
          </g>
        ) : (
          <g className="racing-pattern">
            <path d="M680-80h74L354 730h-74z" />
            <path d="M784-80h35L419 730h-35z" />
            <path d="M849-80h15L464 730h-15z" />
          </g>
        )}
      </svg>
    </Reveal>
  );
}
