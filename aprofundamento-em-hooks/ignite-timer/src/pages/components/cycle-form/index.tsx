    import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
    import { useFormContext } from "react-hook-form";
    import { useContext } from "react";
    import { CyclesContext } from "../../../contexts/cycles-provider";

    export function CycleForm(){

        const { isActiveCycle } = useContext(CyclesContext)

        const { register } = useFormContext()

        

        return(
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput type="text" placeholder="Dê um nome para o seu projeto" list="task-suggestions"
                {...register("task")}
                disabled={!!isActiveCycle}
                />

            
                <datalist id="task-suggestions">
                    <option value="Projeto 1"/>
                    <option value="Projeto 2"/>
                    <option value="Projeto 3"/>
                </datalist>
                

                <label htmlFor="minutesAmount">durante</label>
                <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} 
                {...register("minutesAmount", {valueAsNumber: true})}
                disabled={!!isActiveCycle}
                />

                <span>minutos.</span>
                
                </FormContainer>
        )
    }