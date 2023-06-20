import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = [ "Software Engineer", "Web Developer", "Project Manager", "Marketing Enthusiast", "Aviation Geek ;)" ];
    const [text, setText] = useState(''); //text to be displayed
    const [delta, setDelta] = useState(300 - Math.random() * 100); //amount of time for each letter to be typed or deleted
    const period = 2000; //amuont of time to transition between each word

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        },delta)

        return () => {clearInterval(ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length; //resets index to first element after last element
        let fullText = toRotate[i]; //sets word to display
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1); //sets string to display deleted or added letters

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta/2); //speeds up deleting letters
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        } 
    }

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{`Hi, I'm Fawaz, `}<span className="wrap">{text}</span></h1>
                        <p>This part will be about myself</p>
                        <button onClick={() => console.log('connect')}>Let's Connect<ArrowRightCircle size={25}></ArrowRightCircle></button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}