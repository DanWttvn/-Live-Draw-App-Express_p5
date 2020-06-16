export default function prueba(state = [], action) {
	switch (action.type) {
	  case 'ADD_TODO':
		return state.concat([action.text])
	  default:
		return state
	}
  }