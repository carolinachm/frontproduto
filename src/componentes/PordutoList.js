import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button } from 'primereact/button';
 


function ProdutoList({ vetor, selecionar }) {
   
  
    return(
        <div className='table'>
            <DataTable value={vetor} selectionMode="single" selection={selecionar} paginator rows={10} rowsPerPageOptions={[10,20,50]} totalRecords={10}>
            <Column field="codigo" header="Codigo"></Column>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="categoria" header="Categoria"></Column>
                    <Column field="preco" header="Preço"></Column>
                    <Column
                body={(rowData) => (
                    <Button
                        onClick={() => selecionar(rowData)}
                        className="p-button-success"
                    >
                        Selecionar
                    </Button>
                )}
            ></Column>
            </DataTable>

        </div>

    )
}

export default ProdutoList;