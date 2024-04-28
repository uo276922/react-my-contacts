import { BiSortAZ, BiSortZA } from "react-icons/bi";

const Searcher = ({ searchChange, az, za, onGenderChange }) => {
  return (
    <div className="pa2 bg-lightest-blue flex justify-center items-center">
      <div className="mr3  f1 ml3">
        <a href="#0" title="Ascending order" onClick={az}>
          <BiSortAZ />
        </a>
        <a href="#0" title="Descending order" onClick={za}>
          <BiSortZA />
        </a>
      </div>
      <input
        className="ba b--blue bg-light-green pa3 br3 w-20"
        type="search"
        placeholder="search contacts"
        onChange={searchChange}
      />
      <select
        onChange={(e) => onGenderChange(e.target.value)}
        className="pa2 mb2 ml3"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};
export default Searcher;
