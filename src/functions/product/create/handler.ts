import { APIGatewayProxyHandler } from 'aws-lambda';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const create: APIGatewayProxyHandler = async (event) => {
  try {
    // Verifica se há um body na requisição
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Dados do produto não fornecidos'
        })
      };
    }

    console.log('AKIIIIIIIIIII', event.body);

    // Parse do body da requisição

    var product = JSON.parse(event.body);

    // const product: Product = {
    //     id: event.body.id,
    //     name: event.body.name,
    //     price: event.body.price,
    //     description: event.body.description,
    // }

    console.log('Product', product);

    // Validação básica dos campos obrigatórios
    if (!product.name || !product.price) {
      console.log('AKIIIIIIIIIII');
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Nome e preço são campos obrigatórios'
        })
      };
    }

    // Aqui você implementaria a lógica para salvar no banco de dados
    // Por enquanto vamos apenas simular um produto criado
    const createdProduct = {
      id: Date.now().toString(), // Simula um ID único
      ...product,
      createdAt: new Date().toISOString()
    };

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Produto criado com sucesso',
        product: createdProduct
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro interno ao criar produto',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    };
  }
};
