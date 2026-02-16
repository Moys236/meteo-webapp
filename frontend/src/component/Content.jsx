import Forecast from "./Forecast";
import GridDashboard from "./GridDashboard";

function Content () {
    return (
        <div className="main-content">
           <GridDashboard />
           <Forecast />
        </div>
    )
}
export default Content;