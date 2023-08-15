import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res,Dependencies  } from '@nestjs/common';
import { CatsService } from './cats.service';

const GATOS = [
    {
        id: 1,
        nome: "Franeudos",
        corOlhos: "verde",
        raca: "sphynx"
    },
    {
        id: 2,
        nome: "Chico",
        corOlhos: "azul",
        raca: "siamês"
    },
    {
        id: 3,
        nome: "Chambaril",
        corOlhos: "preto",
        raca: "munchkin"
    }
];

@Controller('cats')
@Dependencies(CatsService)
export class CatsController {
constructor(catsService){

this.catsService = catsService;
}
  
  
    @Get()
    findAll() {
        return this.catsService.findAll();
    }

    @Get(':id')
    @Bind(Param(), Res())
    findOne(params, res) {
       const gatoEncontrado = this.catsService.findById(params.id);
        if(gatoEncontrado) {
            res.status(HttpStatus.OK).json(gatoEncontrado);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
        
    }

    @Delete(':id')
    @Bind(Param('id'), Res())
    remove(id, res) {
        const indexGatoEncontrado = this.catsService.findIndexById(id);
        if(indexGatoEncontrado >= 0){
            this.catsService.deleteByIndex(indexGatoEncontrado);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Post()
    @Bind(Body(), Res())
    create(cat, res) {
        this.catsService.create(cat)
        res.status(HttpStatus.CREATED).json(cat);
    }

    @Put(':id')
    @Bind(Param('id'), Body(), Res())
    update(id, cat,res) {
        const indexGatoEncontrado = GATOS.findIndex(gato => gato.id == id);
        if(indexGatoEncontrado >= 0){
            GATOS.splice(indexGatoEncontrado, 1,cat);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
        
        
    }

}
