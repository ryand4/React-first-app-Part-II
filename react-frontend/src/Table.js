function Table (props) {
    return (
        <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
              <button onClick={() => 
                  props.removeCharacter(index)}>
                  Delete
              </button>
        </td>
      </tr>
    );
  }