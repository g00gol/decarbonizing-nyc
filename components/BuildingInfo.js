const BuildingInfo = ({ toggleModal, buildingInfo }) => {
  if (toggleModal) {
    return (
      <div className="w-fit h-fit bg-black/50 border-0 backdrop-blur rounded-lg shadow-md text-white text-lg p-8">
        <ul>
          {buildingInfo ? (
            Object.keys(buildingInfo).map((key, i) => {
              return (
                <li key={i}>
                  <span className="text-gray-300">{key}:</span>{" "}
                  {buildingInfo[key]}
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  }
};

export default BuildingInfo;
