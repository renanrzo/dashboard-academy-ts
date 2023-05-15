import React, { useEffect, useState } from "react";


import * as yup from 'yup';
import { AxiosError } from "axios";

import Form from "../../../components/forms/Form/Form";
import Input from "../../../components/forms/input/Input";
import Title from "../../../components/common/Title/Title";
import Button from "../../../components/common/Button/Button";
import InformacoesCard from "../CadastrarExperiencia/InformacoesCard";
import TextArea from "../../../components/forms/textarea/TextArea";


import { Informacoes, updateInformacoes, getInformacoes, createOrUpdateInformacoes, deleteInformacoes } from "../../../services/informacoesService";


import styles from './CadastrarInformacoes.module.css';


const CadastrarInformacoes: React.FC = () => {

    const [informacoes, setInformacoes] = useState<Informacoes>();

    const initialValues: Informacoes = {
        foto: '',
        nome: '',
        cargo: '',
        resumo: '',
    };

    const validationSchema = yup.object().shape({
        foto: yup.string().required('Campo obrigatório'),
        nome: yup.string().required('Campo obrigatório'),
        cargo: yup.string().required('Campo obrigatório'),
        resumo: yup.string().required('Campo obrigatório'),
    });

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status !== 404) {
                    console.error('Erro ao buscar informações:', error);
                }
            } else {
                console.error("Ocorreu um erro desconhecido ao buscar informações:", error);
            }

        }
    };

    useEffect(() => {
        fetchInformacao();
    }, []);

    const onSubmit = async (values: Informacoes) => {
        try {
            await createOrUpdateInformacoes(values);
            setInformacoes(values);
            alert('Formulário enviado com sucesso!!');

        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteInformacoes();
            setInformacoes(undefined);
            alert('Informações deletadas com sucesso!');
        } catch (error) {
            console.error('Erro ao tentar deletar informações:', error);
            alert('Ocorreu um erro ao deletar as informações. Tente novamente.');
        }
    };

    return (

        <div className={styles.container}>
            <Form
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>

                {({ errors, touched }) => (

                    <>
                        <Title>Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <TextArea
                            label="Resumo"
                            name="resumo"
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type="submit">Salvar</Button>
                    </>

                )}
            </Form>

            {informacoes &&
                <div className="styles.container">
                    <InformacoesCard informacoes={informacoes} />
                    <Button onClick={handleDelete} red>Deletar</Button>
                </div>
            }
        </div>
    );
};

export default CadastrarInformacoes;