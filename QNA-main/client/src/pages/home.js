import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "font-awesome/css/font-awesome.min.css";

function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="home-container" data-scroll-container ref={scrollRef}>
      <div className="container">
        <div className="navbar">
          <div className="logo">QnA.AI</div>
          <div className="links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="hero" data-scroll data-scroll-speed="1">
          <div className="hero-card">
            <div className="hero-text">
              <h1>Your Personalized Bot Builder</h1>
              <p>From the AI -- By the AI -- To the AI</p>
              <button>
                <Link to="/login">BUILD</Link>
              </button>
            </div>
            <div className="hero-image">
              <img src="https://i.gifer.com/SImn.gif" />
            </div>
          </div>
          <div className="blob"></div>
        </div>
      </div>

      <div className="container-2" data-scroll data-scroll-speed="1">
        <div className="features-heading">
          <h1>
            Why <br />
            Us?
          </h1>
        </div>
        <div className="features">
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Intelligent Parsing</h2>
              <p>
                QNA.ai's advanced algorithms meticulously extract key insights
                from your PDFs, ensuring your bots are rich with accurate
                information ready to engage users.
              </p>
            </div>
          </div>
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Tailored Bot Creation</h2>
              <p>
                Create bespoke bots that reflect your PDF content seamlessly.
                With QNA.ai, customize responses, dialogue flows, and
                personality traits to match your brand and audience.
              </p>
            </div>
          </div>
          <div class="card">
            <span></span>
            <div class="content">
              <h2>Engaging User Experience</h2>
              <p>
                Empower users with an intuitive Q&A interface. QNA.ai's bots
                effortlessly handle inquiries, providing instant responses and
                enhancing user engagement with your PDF content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-5" data-scroll data-scroll-speed="1">
        <div className="timeline-heading">
          <h1>
            lets <br />
            Begin :)
          </h1>
        </div>
        <div className="timeline">
          <div className="timeline__event animated fadeInUp delay-3s timeline__event--type1">
            <div className="timeline__event__icon ">
              <i className="lni-cake"></i>
              <div className="timeline__event__date">Step 1</div>
            </div>
            <div className="timeline__event__content ">
              <div className="timeline__event__title">Create Profile</div>
              <div className="timeline__event__description">
                <p>
                  Users sign up and create a profile on the QNA.ai platform.
                  They input their preferences, customize settings, and set up
                  their account to tailor the bot-building experience to their
                  needs.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
            <div className="timeline__event__icon">
              <i className="lni-burger"></i>
              <div className="timeline__event__date">Step 2</div>
            </div>
            <div className="timeline__event__content">
              <div className="timeline__event__title">
                Upload PDF for Bot Training
              </div>
              <div className="timeline__event__description">
                <p>
                  Users upload PDF documents they want the bot to be trained on.
                  QNA.ai's algorithms analyze the PDF content, extracting
                  relevant information and training the bot to respond
                  accurately to user inquiries based on the document.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
            <div className="timeline__event__icon">
              <i className="lni-slim"></i>
              <div className="timeline__event__date">Step 3</div>
            </div>
            <div className="timeline__event__content">
              <div className="timeline__event__title">Interact with Bot</div>
              <div className="timeline__event__description">
                <p>
                  Once the bot is trained, users can interact with it through
                  the platform. Users can ask questions related to the uploaded
                  PDFs, and the bot provides instant, relevant responses,
                  facilitating smooth communication and enhancing user
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-3" data-scroll data-scroll-speed="1">
        <div className="about-heading">
          <h1>
            Meet the <br />
            Team :)
          </h1>
        </div>
        <div className="about-container">
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://i.ibb.co/FJtN84y/mayur.jpg" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  Mayur Behere <br />
                  <span>Frontend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="https://www.linkedin.com/in/mayur-behere-446148223/">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="https://www.instagram.com/mayur_behere/">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="https://github.com/MayurBehere">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://i.ibb.co/xqztgmf/Whats-App-Image-2024-02-27-at-20-22-29-15ea6528.jpg" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  sahaj mishra <br />
                  <span>ML Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="https://www.instagram.com/sahajm2027/?igsh=dXljZm50bmJldzFk">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="https://github.com/Sahaj-27">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img
                  src="https://i.ibb.co/GW4yfVQ/Whats-App-Image-2024-02-27-at-20-08-36-20cb661b.jpg"
                  alt="Profile"
                />
              </div>
              <div className="about-cardContent">
                <h3>
                  Prathamesh Patil <br />
                  <span>Backend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="https://www.linkedin.com/in/prathamesh-patil-8a403624a/">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="https://www.instagram.com/_parth2003?igsh=ODN5cXV2OW1vZzZp">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="https://github.com/prathamesh093">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="about-content">
              <div className="about-img">
                <img src="https://unsplash.it/200/200" alt="Profile" />
              </div>
              <div className="about-cardContent">
                <h3>
                  Gaurav Chowdhary <br />
                  <span>Backend Development</span>
                </h3>
              </div>
            </div>
            <ul className="about-social-icons">
              <li style={{ "--i": 1 }}>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 2 }}>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li style={{ "--i": 3 }}>
                <a href="#">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-4" data-scroll data-scroll-speed="1">
        <div className="contact-form">
          <h1 className="form-title">Contact Us</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
          <div className="blob"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
