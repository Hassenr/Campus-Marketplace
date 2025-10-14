

type CardProps = {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    price,
    imageUrl,
}) => (
    <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        background: "#ffffff80"
    }}>
        {imageUrl && (
            <img
                src={imageUrl}
                alt={title}
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
            />
        )}
        <h2 style={{ fontSize: "1.25rem", margin: "12px 0 8px" }}>{title}</h2>
        <p style={{ color: "#555", marginBottom: "12px" }}>{description}</p>
        <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>${price.toFixed(2)}</div>
    </div>
);

export default Card;