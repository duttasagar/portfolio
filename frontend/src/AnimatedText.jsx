import SplitText from "./SplitText";

const AnimatedText = ({
  text,
  tag = "h1",
  className = "",
}) => {
  return (
    <SplitText
      text={text}
      tag={tag}
      className={className}
      delay={50}
      duration={1}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 50 }}
      to={{ opacity: 1, y: 0 }}
    />
  );
};

export default AnimatedText;