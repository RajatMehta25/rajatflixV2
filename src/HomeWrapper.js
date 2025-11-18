import Spline from "@splinetool/react-spline";

export default function HomeWrapper({ children }) {
  return (
    <Spline style={{ position: "absolute" }} scene="https://prod.spline.design/b9OIZgR8qpM3YAr3/scene.splinecode">
      <div style={{ position: "relative", zIndex: "1" }}>{children}</div>
    </Spline>
  );
}
