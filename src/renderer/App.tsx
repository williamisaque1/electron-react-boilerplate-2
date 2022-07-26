import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Modal from '../renderer/src/components/modal/index';
import { MouseEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome/';
import {
  faListDots,
  faTrash,
} from '../../node_modules/@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
interface Obj {
  id: String;
  conteudo: String;
  realizada: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Hello = () => {
  const [data, setData] = useState<Obj[]>([]);
  const [conteudo, setConteudo] = useState<Obj[]>([]);
  async function listar() {
    let datas = await window.api.create('listar');
    console.log(datas);
    setData(datas);
  }
  useEffect(() => {
    listar();
  }, []);
  useEffect(() => {
    setData([...conteudo, ...data]);
    //listar();
  }, [conteudo]);
  async function excluir(id: String, index: Number) {
    console.log(id);
    let elem = $(event?.target as EventTarget).closest('div');

    let datas = await window.api.delete('delete', id);
    data.splice(+index, 1);
    if (datas) {
      let time = setTimeout(() => {
        setData([...data]);
      }, 350);
      elem.slideUp('1000', () => {
        clearTimeout(time);
      });
    }
  }

  return (
    <div>
      <div className="container-fluid bg-black" style={{ minHeight: '98.5vh' }}>
        <div className="row mt-2 ">
          <div className="col-5 mt-1 ">
            <button
              type="button"
              className="btn btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              addtarefa
            </button>
            <button
              className=" btn btn-light"
              id="deletar"
              onClick={async () => {
                await window.api.deleteTruncate('deleteTruncate');
                await listar();
              }}
            >
              Deletar Tudo
            </button>
          </div>
        </div>
        <div className="row mt-3  justify-content-center">
          <div className="col-10 ">
            {data.length == 0 ? (
              <b className="text-white">Carregando...</b>
            ) : (
              data.map((d, index) => (
                <div
                  key={d.id.toString()}
                  className="alert alert-secondary  d-flex justify-content-between"
                  role="alert"
                >
                  {d.conteudo}
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={(e: MouseEvent) => excluir(d.id, index)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div id="modal-window">
        <Modal
          sett={setConteudo}
          conteudos={conteudo}
          data={data}
          setdata={setData}
        ></Modal>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
