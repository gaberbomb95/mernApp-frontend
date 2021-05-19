import React from "react";

const Display = (props) => {
  const { guns, selectGun } = props;

  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {guns.map((gun) => (
        <article key={gun._id}>
          <h2>{gun.brand}</h2>
          <h3>{gun.model}</h3>
          <img src={gun.img} />
          <button
            onClick={() => {
              selectGun(gun);
              props.history.push("/edit");
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              props.deleteGun(gun);
            }}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );

  const loading = () => <h1>Loading</h1>;
  console.log("adwDFwdfw", guns);
  return guns.length > 0 ? loaded() : loading();
};

export default Display;
