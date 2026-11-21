function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <p className="eyebrow"><span /> Independent digital studio</p>
      <h1>We make good ideas <span>impossible to ignore.</span></h1>
      <p className="hero__intro">
        Northstar partners with ambitious teams to turn their next big thing into a clear,
        memorable digital experience.
      </p>
      <a className="hero__link" href="#work">Explore our work <span aria-hidden="true">↓</span></a>
      <div className="hero__visual" aria-label="Coffee and flowers" role="img">
        <img
          className="hero__photo hero__photo--coffee"
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85"
          alt=""
        />
        <img
          className="hero__photo hero__photo--flowers"
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85"
          alt=""
        />
        <span className="hero__visual-label">Slow mornings, good ideas</span>
      </div>
    </section>
  );
}

export default Hero;