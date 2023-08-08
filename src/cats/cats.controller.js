import { Bind, Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';

const gatos = [
    {
        id: 1,
        nome: "raposo",
        corOlhos: "azul",
        raca: "persa"
    },
    {
        id: 2,
        nome: "dora",
        corOlhos: "azul",
        raca: "angora"
    },
    {
        id: 3,
        nome: "iceberg",
        corOlhos: "verde",
        raca: "simames"
    }
]

@Controller('cats')
export class CatsController {
    @Get()
    findAll() {
        return gatos;
    }

    @Get(':id')
    @Bind(Param(), Res())
    findOne(params, res) {
        const CatData = gatos.find(gato => gato.id == Number(params.id));
       
        if (CatData) {
            res.status(HttpStatus.OK).json(CatData);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();

        }
    }

    
}