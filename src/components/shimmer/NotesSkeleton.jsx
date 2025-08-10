import './shimmer.css';

export const NotesSkeleton = ({ count = 8 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="skeleton-card">
                </div>
            ))}
        </>
    );
};
