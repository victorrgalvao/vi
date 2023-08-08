import { Bind, Controller, Get, Param, Res, HttpStatus, Delete,Post,Body,Put} from '@nestjs/common';

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
    @Delete(':id')
    @Bind(Param('id'), Res())
    remove(id, res) {
        const indexGatoEncontrado = gatos.findIndex(gato => gato.id == id);
        if(indexGatoEncontrado >= 0){
            gatos.splice(indexGatoEncontrado, 1);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Post()
    @Bind(Body(),Res())
    create(cat,res) {
      gatos.push(cat);

res.status(HttpStatus.CREATED).json(cat)
        
    }
@Put(':id')
   @Bind(Param('id'), Body())
   update(id,cat){
    return `att o gato com o ${id} e valores ${JSON.stringify(cat)}`
   }
}