import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import $ from 'jquery';
export default ({
  sett,
  conteudos,
  data,
  setdata,
}: {
  conteudos: any;
  sett: any;
  data: any;
  setdata: any;
}) => {
  useEffect(() => {
    console.log('use feffect');
    console.log(conteudos);
  }, [conteudos]);
  const [valueUser, setValueUser] = useState('');
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="formAddTarefa">
              <div className="mb-3">
                <label className="form-label">coloque a tarefa</label>
                <input
                  type="text"
                  className="form-control"
                  id="addtarefa"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setValueUser(e.target.value);
                  }}
                  value={valueUser}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={async (e: MouseEvent) => {
                  e.preventDefault();
                  sett([await window.api.add('add', valueUser, false)]);
                  $('#modal-window .btn-close').trigger('click');
                  setValueUser('');
                }}
              >
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
