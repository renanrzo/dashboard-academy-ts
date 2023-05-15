import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";


import Home from "../pages/home";
import ListaPortfolio from "../pages/portfolio/ListaPortfolio";
import ListaExperiencia from "../pages/curriculum/ListaExperiencia";
import CadastrarPortfolio from "../pages/portfolio/CadastrarPortfolio";
import CadastrarInformacoes from "../pages/curriculum/CadastrarInformacoes";
import CadastrarExperiencia from "../pages/curriculum/CadastrarExperiencia";

import Layout from "../components/layout";

import { useAuth } from "../contexts/AuthContext";

const AppRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/curriculo/informacoes" element={<CadastrarInformacoes />} />
                <Route path="/curriculo/experiencia/cadastrar" element={<CadastrarExperiencia />} />
                <Route path="/curriculo/experiencia/atualizar" element={<CadastrarExperiencia />} />
                <Route path="/curriculo/experiencia/listar" element={<ListaExperiencia />} />
                <Route path="/portfolio/cadastrar" element={<CadastrarPortfolio />} />
                <Route path="/portfolio/atualizar" element={<CadastrarPortfolio />} />
                <Route path="/portfolio/listar" element={<ListaPortfolio />} />
            </Routes>
        </Layout>
    );
}

export default AppRoutes;