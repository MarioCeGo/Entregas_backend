//Desafio clases - Mario Gonzalez
class Usuario{
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `Nombre completo: ${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return  this.mascotas.length > 1 ? `El usuario tiene ${this.mascotas.length} mascotas` : `El usuario tiene una mascota`;
    }
    addBook(nombre, autor){
        this.libros.push({nombre:nombre, autor:autor});
    }
    getBookNames(){
        const bookNames = [];
        for(const elem of this.libros){
            bookNames.push(elem.nombre);
        }
        return bookNames
    }
}
const usuario = new Usuario ("Elon", "Musk");
usuario.addMascota("Perro");
usuario.addMascota("Gato");
usuario.addBook("El señor de las moscas", "William Golding");
usuario.addBook("Fundacion", "Isaac Asimov");

console.log(usuario.getFullName());
console.log(usuario.getBookNames());
console.log(usuario.countMascotas());

