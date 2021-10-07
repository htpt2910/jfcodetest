function Item( props ) {

  return (
    <>
        <label>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={props.onChange}
  
          />
          {props.cityName}
        </label>
      
      
    </>
  );
}

export default Item;