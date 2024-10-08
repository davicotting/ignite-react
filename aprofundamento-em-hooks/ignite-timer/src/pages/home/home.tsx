    import { Play } from "phosphor-react"
    import { CountDownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput} from "./styles"
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import * as zod from "zod";
    import { useEffect, useState } from "react";
    import { differenceInSeconds } from "date-fns";

    export function Home(){

        interface Cycle {
            id: string;
            task: string;
            minutesAmount: number;
            startDate: Date;
        }

        const [cycles, setCycles] = useState<Cycle[]>([]);
        const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
        const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

        const newCycleFormValidation = zod.object({
            task: zod.string().min(1, "O seu novo ciclo deve ter no mínimo 1 caratere."),
            minutesAmount: zod.number()
            .min(5, "O seu novo ciclo deve ter no minimo 5 minutos.")
            .max(60, "O seu ciclo deve ter no maximo 60 minutos."),
        })

        type newCycleFormType = zod.infer<typeof newCycleFormValidation>

        const { register, handleSubmit, watch, formState, reset} = useForm<newCycleFormType>({
            resolver: zodResolver(newCycleFormValidation),
            defaultValues: {
                task: "",
                minutesAmount: 0,
            }
        });
        
       

        console.log(formState.errors)

        const isActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId);

        const totalInSeconds = isActiveCycle ? isActiveCycle.minutesAmount * 60: 0;

        const currentSeconds = isActiveCycle ? totalInSeconds - amountSecondsPassed: 0;

        const minutesAmount = Math.floor(currentSeconds / 60);
        const secondsAmount = currentSeconds % 60;

        const minutes = String(minutesAmount).padStart(2, "0");
        const seconds = String(secondsAmount).padStart(2, "0");


        console.log(minutesAmount, secondsAmount)

        function handleCreateNewCycle(data: newCycleFormType){
            const id = String(new Date().getTime());

            const newCycle: Cycle = {
                id,
                task: data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date(),
            }

            setCycles((prevState) => [...prevState, newCycle]);
            setActiveCycleId(id);
            setAmountSecondsPassed(0)


            reset();
        }


        const task = watch("task");

        const isSubmitDisabled = !task;

        useEffect(() => {
            let interval: number;
            if(isActiveCycle){
                interval = setInterval(() => {
                    setAmountSecondsPassed(differenceInSeconds(new Date(), isActiveCycle.startDate));
                    console.log(amountSecondsPassed)
                }, 1000)
            }

            return () => {
                clearInterval(interval)
            }

        }, [isActiveCycle]);

        return(
            <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>

                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput type="text" placeholder="Dê um nome para o seu projeto" list="task-suggestions"
                {...register("task")}/>

            
                <datalist id="task-suggestions">
                    <option value="Codar meu portifolio"/>
                    <option value="Estudar NextJS"/>
                </datalist>
                

                <label htmlFor="minutesAmount">durante</label>
                <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} 
                {...register("minutesAmount", {valueAsNumber: true})}/>

                <span>minutos.</span>
                
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                <StartCountdownButton type="submit"  disabled={isSubmitDisabled}>
                <Play size={24}/>
                Começar
                </StartCountdownButton>
            </form>
            </HomeContainer>
        )
    }