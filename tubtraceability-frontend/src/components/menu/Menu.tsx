import { Link } from "react-router-dom";
import "./menu.scss";


const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Companies",
        url: "/companies",
        icon: "/company.svg",
      },
      {
        id: 2,
        title: "Countries",
        url: "/",
        icon: "/country.svg",
      },
      {
        id: 3,
        title: "Transactions",
        url: "/",
        icon: "/transaction.svg",
      },	  
    ],
  },
  {
    id: 2,
    title: "Company",
    listItems: [
      {
        id: 1,
        title: "Overview",
        url: "/",
        icon: "/overview.svg",
      },
      {
        id: 2,
        title: "Transfers",
        url: "/",
        icon: "/transfer.svg",
      },
      {
        id: 3,
        title: "Score",
        url: "/",
        icon: "/score.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Transfer",
    listItems: [
      {
        id: 1,
        title: "SPA",
        url: "/",
        icon: "/spa.svg",
      },
      {
        id: 2,
        title: "Swift",
        url: "/",
        icon: "/swift.svg",
      },      
    ],
  },
];

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
