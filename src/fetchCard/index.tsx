import { useEffect, useState } from "react";
import "./Card.scss";
import axios from "axios";
import { Button, Dialog, TextField } from "@mui/material";

export interface ICard {
  id: number;
  title: string;
  price: string;
  image: string;
}
const marCard = {
  id: 0,
  title: "",
  price: "",
  image: "",
};

const FetchCard = () => {
  const [inputValue, setInputValue] = useState<ICard>(marCard);
  const [cards, setCards] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editedCard, setEditedCard] = useState<ICard>(marCard);

  useEffect(() => {
    getCards();
  }, []);
  const onChange = (event: any) => {
    setInputValue((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const saveCard = async () => {
    await axios.post("https://6560ce5f83aba11d99d18b21.mockapi.io/cards", {
      title: inputValue.title,
      price: inputValue.price,
      image: inputValue.image,
    });
    getCards();
  };
  const getCards = async () => {
    const cards = (
      await axios.get("https://6560ce5f83aba11d99d18b21.mockapi.io/cards")
    ).data;
    setCards(cards);
  };
  const onDelete = async (id: number) => {
    await axios.delete(
      `https://6560ce5f83aba11d99d18b21.mockapi.io/cards/${id}`
    );
    getCards();
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onClickEdit = (ICard: any) => {
    setEditedCard(ICard);
    setIsOpen(true);
  };
  const saveEditedCard = async () => {
    await axios.put(`https://6560ce5f83aba11d99d18b21.mockapi.io/cards/${editedCard.id}`, {title: editedCard.title, price: editedCard.price, 
    image: editedCard.image})
    getCards()
    setIsOpen(false)
  }
  const onChangeEdited = (e: any) => {
    setEditedCard((prev) => {
      return { ...prev, [e.target.name]: e.target.value}
    })
  }

  return (
    <div>
      <h1>Clothes`s Cards</h1>
      <div>
        <input
          onChange={onChange}
          value={inputValue.title}
          name="title"
          type="text"
        />
        <input
          onChange={onChange}
          value={inputValue.price}
          name="price"
          type="text"
        />
        <input
          onChange={onChange}
          value={inputValue.image}
          name="image"
          type="text"
        />
        <button onClick={saveCard}>Save Clothe`s Card</button>
      </div>
      {cards.map((card) => {
        return (
          <div className="card" key={card.id}>
            <img className="card__image" src={card.image} />
            <h2 className="card__title">{card.title}</h2>
            <p className="card__price">{card.price}</p>
            <button className="card__buttons" onClick={() => onDelete(card.id)}>
              Delete
            </button>
            <button className="card__buttons" onClick={() => onClickEdit(card)}>
              Редактировать
            </button>
          </div>
        );
      })}
      <Dialog open={isOpen}>
        <TextField onChange={onChangeEdited} sx={{ margin: "20px" }} value={editedCard.title} label="Редактируемое название"/>
        <TextField onChange={onChangeEdited} sx={{ margin: "20px" }} value={editedCard.price} label="Редактируемая цена "/>
        <TextField onChange={onChangeEdited} sx={{ margin: "20px" }} value={editedCard.image} label="Редактируемый URL"/>
        <Button onClick={saveEditedCard}>Сохранить</Button>
        <Button onClick={onClose} variant="contained">
          Отменить
        </Button>
      </Dialog>
    </div>
  );
};

export default FetchCard; 
