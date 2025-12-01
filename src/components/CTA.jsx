import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Interested in research collaboration or academic discussion? <br className='sm:block hidden' />
        Let's connect and explore interdisciplinary opportunities.
      </p>
      <Link to='/contact' className='btn'>
        Contact
      </Link>
    </section>
  );
};

export default CTA;
