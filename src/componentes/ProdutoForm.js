import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function ProdutoForm({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar, displayDialog}) {

  const [visible,setVisible]= useState(false)
 

  return (
      <div style={{padding:"80px", display: "grid", gridTemplateColumns: "repeat(4, 1fr"}}>
          <Button label='Novo Cadastro' onClick={() => setVisible(true)} />
          <Dialog visible={visible} header={botao ? "Cadastrar Produto" : "Editar Produto"} onHide={()=> setVisible(false)} style={{ width: "50vw" }} draggable={false}>
              <div className="card">
                  <InputText type='text' value={obj.nome} onChange={eventoTeclado} name='nome' placeholder='Nome' className='p-inputtext' />
                  <InputText type='text' value={obj.categoria} onChange={eventoTeclado} name='categoria' placeholder='Categoria' className='p-inputtext' />
                  <InputText type='text' value={obj.marca} onChange={eventoTeclado} name='marca' placeholder='Marca' className='p-inputtext' />

                  <InputText type='text' value={obj.preco} onChange={eventoTeclado} name='preco' placeholder='Preço' className='p-inputtext' />

              </div>
              <div>
                  {botao ? (
                      <Button label="Cadastrar" onClick={cadastrar} className='p-button-success' />
                  ) : (
                      <div>
                          <Button label="Alterar" onClick={alterar} className='p-button-warning' />
                          <Button label="Remover" onClick={remover} className='p-button-danger' />
                          <Button label="Cancelar" onClick={cancelar} className='p-button-secondary' />
                      </div>
                  )}
              </div>
          </Dialog>
      </div>


  );


}
export default ProdutoForm;