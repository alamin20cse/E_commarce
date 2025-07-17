import useMenu from "../Hooks/useMenu";
import OrderTab from "../Order/OrderTab";


const Menu = () => {

    const [menu] = useMenu();
    return (
        <div className="pt-24">

              <OrderTab items={menu}></OrderTab>
          
        </div>
    );
};

export default Menu;