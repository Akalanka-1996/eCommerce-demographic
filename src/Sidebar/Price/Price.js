import Input from "../../components/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value={50}
          title="Rs. 0 - 2000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={100}
          title="Rs. 2000 - 4000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={150}
          title="Rs. 4000 - 6000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={200}
          title="Over Rs.6000"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
