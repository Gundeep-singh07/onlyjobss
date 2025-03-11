import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Stay Updated</h2>
      <p>Get the latest jobs and hiring trends delivered to your inbox</p>
      <form className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter-input"
          required
        />
        <button type="submit" className="button button-success">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
