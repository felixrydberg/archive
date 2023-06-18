const Ul = (props) => {
  return (
    <div>
      <h1>Category: {props.type}</h1>
      <ul>
        {props.item.map((item, index) => {
          return (
            <li key={index}>
              <h2>{item.name}</h2>
              <div>
                <h3>Category: {item.category}</h3>
                <h3>Amount: {item.amount}</h3>
                <h3>Date: {item.date}</h3>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ul;
