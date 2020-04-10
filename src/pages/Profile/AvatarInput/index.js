import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import avatar from '~/assets/avatar.png';
import { Container } from './styles';

export default function AvatarInput() {
  // Pegar o avatar do user
  // Esse avatar é o nome da info que tá armazenada no redux
  // Quando passo o profile no initial data do Formulario vai junto o avatar, que é o desse usefield
  // O default value pega o objeto da imagem, com id, url e path
  const { defaultValue, registerField } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.id); // Quando o usuario mudar, vai chamr a api envia esse avatar e ele retorna um novo id, que vai ser salvo nesse file
  const [preview, setPreview] = useState(defaultValue && defaultValue.url); // Se eu tiver alguma coisa no defaultValue eu quero utilizar o defaultValue.url nessa preview

  const ref = useRef(); // O unform precisa da referencia do input pra depois buscar o valor

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id', // É enviado para a api
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  // Quando o usuario seleciona uma imagem
  async function handleChange(e) {
    const data = new FormData(); // Pra multer conseguir recuperar no formulario de MultPartFormData

    data.append('file', e.target.files[0]); // file é o mesmo nome do campo lá no insomnia quando manda na requisição .. como o input aceita mais de um arquivo ele sempre vem no array  e como quero um arquivo só pegó só o primeiro
    const response = await api.post('files', data);
    console.tron.log('data', data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || avatar} alt="" />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          ref={ref}
          data-file={file}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
