function Tooltip(props) {    
    return (
        <div className="tooltip">
            <div className="tooltip__img">
                <div>
                    {props.itemName ? <img width="64" height="64" alt={`Smite in game item: ${props.itemName}`} src={"/images/" + props.itemName.replace(/\s+/g, '-').replace(/'/g, "").toLowerCase() + ".jpg"} loading="lazy"></img> : null}
                </div>
            </div>
            <div className="tooltip__content">
                <p className="item-name">{props.item ? props.item.DeviceName : null}</p>
                {props.item ? props.item.ItemDescription.Menuitems.map((detail) => {
                    return (                                        
                        <p className="item-details" key={detail.Description}>{detail.Description} {detail.Value}</p>                                        
                    )
                }) : null}                
                {props.item.ItemDescription.SecondaryDescription ? <p className="item-description">{props.item.ItemDescription.SecondaryDescription}</p> : null}
            </div>
        </div>
    )
}

export default Tooltip;