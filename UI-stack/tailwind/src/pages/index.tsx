import Head from "next/head";
import {Sevillana} from "next/font/google";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const font = Sevillana({
  subsets: ["latin"], weight: '400',
  variable: "--font-sans",
});

const formSchema = z.object({
  email: z.string().email(),
})

export default function Home() {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={cn(font.variable, "font-sans")}>
        <div className="min-h-[100vh] flex justify-center items-center">
          <Card className="w-[400px] shadow border-b-accent border-b-2 rounded-b-3xl">
            <CardHeader className="bg-primary rounded-t-none">
              <CardTitle className="text-white">Email Form</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@mail.here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Please enter your email.
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full hover:bg-accent">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}