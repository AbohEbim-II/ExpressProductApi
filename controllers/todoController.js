import axios from  "axios";
import Todo from  "../models/todo.js";

exports.fetchAndSaveTodo = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const mappedTodo = new Todo({
      externalId: response.data.id,
      title: response.data.title,
      completed: response.data.completed,
    });

    await mappedTodo.save();

    res.status(200).json(mappedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
