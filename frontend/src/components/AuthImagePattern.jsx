import "./styles/AuthImagePattern.css";
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="container">
      <div className="grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={i % 2 === 1 ? "item" : "pulse item"}></div>
        ))}
      </div>
      <h2 style={{ margin: "0px", width: "67%" }}>{title}</h2>
      <p style={{ margin: "0px", width: "67%" }}>{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;
