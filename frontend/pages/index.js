import Header from "../components/Header";
import Products from "../components/Products";
import BasketLink from "../components/BasketLink";

const Index = () => {
    return (
        <div>
            <h1>Главная страница</h1>
            <Header/>
            <img alt='Картинка Земли'/>
            <Products/>
            <BasketLink/>
        </div>
    );
};

export default Index;
