import { Button } from "@/components/ui/button";
import { useSynapse } from "../../store/useSynapse";

const Heading = () => {
  const { setRoute } = useSynapse();
  return (
    <div>
      Hello
      <Button onClick={() => setRoute("home")}>Go top Home</Button>
    </div>
  );
};

export default Heading;
