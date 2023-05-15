import React from "react";

import * as yup from "yup";
import { Formik, FormikHelpers, FormikProps, FormikValues, Form as FormikForm } from "formik";

import styles from './Form.module.css';

interface FormProps<T> {
    initialValues: T;
    validationSchema: yup.ObjectSchema<Omit<Partial<T>, "id">>;
    enableReinitialize?: boolean;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    children: (formikProps: FormikProps<T>) => React.ReactNode;
}

const Form = <T extends FormikValues>({ initialValues, children, validationSchema, onSubmit }: FormProps<T>) => {
    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormikForm className={styles.form}>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default Form;