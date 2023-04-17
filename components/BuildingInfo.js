const BuildingInfo = ({ toggleModal, buildingInfo }) => {
  if (toggleModal) {
    return (
      <div className="absolute w-1/2 h-5/6 bg-[#3B4252] text-white p-8">
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
