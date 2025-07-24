import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { addProblem } from "@/zodSchema/problem.schema";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Code2,
  ChevronRight,
  Lightbulb,
  LoaderCircle,
  House,
  Loader,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORT_LANGUAGE } from "../utills/constants";
import Editer from "@monaco-editor/react";
import toast from "react-hot-toast";
import useProblemStore from "@/store/useProblemStore";
import { useParams } from "react-router-dom";
const UpdateProblem = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const editProblem = useProblemStore((state) => state.editProblem);
  const problem = useProblemStore((state) => state.problem);
  const getProblemById = useProblemStore((state) => state.getProblemById);
  const getingProblem = useProblemStore((state) => state.getingProblem);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await getProblemById(id);
      console.log(problem);
    })();
  }, [getProblemById, id]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProblem),
    defaultValues: problem,
  });

  const {
    fields: testcasesFields,
    append: appendTestcases,
    remove: removeTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (value) => {
    try {
      setIsUpdating(true);
      const response = await editProblem(value, id);
      await getProblemById(id);
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (getingProblem) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-4 w-full text-[var(--primary)]">
      <div className="flex justify-between items-center mb-8 border-b bg-[var(--card)] px-4 py-2 rounded md:flex-row flex-col gap-3">
        <div className="flex items-center ">
          <div>
            <Link to="/">
              {" "}
              <House size={25} className="text-[var(--foreground)]" />
            </Link>
          </div>
          <div className="w-0.5 h-7 m-2 bg-[var(--primary)]"></div>
          <h2 className="md:text-2xl text-lg  text-[var(--foreground)] ">
            Edit Problem
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[var(--card)] p-4 flex flex-col md:flex-row md:gap-4">
          <div className="w-full">
            <div className="mb-6">
              <div>
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Enter your problem's title"
                  className={
                    " w-full bg-transparent p-2 placeholder:capitalize rounded-lg border focus:outline-1 focus:outline-[var(--foreground)]  placeholder:text-[var(--detail-font-color)] text-sm"
                  }
                />
              </div>
              {errors.title && (
                <p className="text-xs text-red-600 mt-2 ml-2">
                  {errors.title.message}
                  {console.log(errors)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div>
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Difficulty
                </label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full focus:outline-1 focus:outline-[var(--foreground)]">
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.difficulty && (
                <p className="text-xs text-red-600 mt-2 ml-2">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full mb-6">
            <div className="h-[90%]">
              <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                Description
              </label>
              <Textarea
                {...register("description")}
                placeholder="Enter You Problem Description"
                className={"h-full"}
              />
            </div>
            {errors.description && (
              <p className="text-xs text-red-600 mt-2 ml-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between ">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <BookOpen className="size-7" />
              Tags
            </h3>
            <button
              type="button"
              className="bg-[var(--primary)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer"
              onClick={() => appendTag("")}
            >
              <Plus size={20} className="mr-2" />
              Add Tags
            </button>
          </div>
          <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
          <div className="min-h-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-[var(--background)] p-4 rounded">
            {tagFields.map((fields, index) => (
              <div key={fields.id} className="flex gap-2 items-center">
                <div>
                  <input
                    {...register(`tags.${index}`)}
                    type="text"
                    placeholder="Enter tags"
                    className={
                      "mb-6 w-full bg-transparent p-2 placeholder:capitalize rounded-lg border focus:outline-1 focus:outline-[var(--foreground)]  placeholder:text-[var(--detail-font-color)] text-sm "
                    }
                  />
                </div>

                <button
                  className=""
                  onClick={() => removeTag(index)}
                  disabled={tagFields.length === 1}
                >
                  {" "}
                  <Trash2 className="size-5 mb-6 text-red-600" />
                </button>
              </div>
            ))}

            {errors.tags && (
              <div className="text-xs text-red-600 mt-2 ml-2">
                {errors.tags?.root.message}
                {console.log(errors)}
              </div>
            )}
          </div>
          {errors.tags && (
            <div className="mt-2 ml-2">
              <span className="text-error text-xs text-red-600">
                {errors.tags.message}
              </span>
            </div>
          )}
        </div>
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <CheckCircle2 className="size-7" />
              Test Cases
            </h3>
            <button
              type="button"
              className="bg-[var(--primary)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer"
              onClick={() => appendTestcases("")}
            >
              <Plus size={20} className="mr-2" />
              Add Test Cases
            </button>
          </div>
          <div className="w-full border border-[var(--sidebar-border)] mt-5 mb-5 h-[1px]"></div>
          {testcasesFields.map((fields, index) => (
            <div
              key={fields.id}
              className=" bg-[var(--background)] p-4 rounded mt-3"
            >
              <div className="flex justify-between items-center ">
                <h4 className="text-[var(--primary)]">
                  Test Case #{index + 1}
                </h4>
                <button
                  className="bg-[var(--background)] text-[var(--primary)] py-2 px-4 text-sm rounded flex items-center cursor-pointer"
                  onClick={() => removeTestcases(index)}
                  disabled={testcasesFields.length === 1}
                >
                  <Trash2 className="size-5  text-red-600" />
                </button>
              </div>
              <div className="min-h-20 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className=" ">
                  <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                    Input
                  </label>
                  <Textarea
                    {...register(`testcases.${index}.input`)}
                    placeholder="Enter Your Test Case Input"
                    className={""}
                  />
                  {errors.testcases?.[index]?.input && (
                    <p className="text-xs text-red-600 mt-1 ml-1 ">
                      {errors.testcases[index].input.message}
                    </p>
                  )}
                </div>
                <div className=" ">
                  <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                    Output
                  </label>
                  <Textarea
                    {...register(`testcases.${index}.output`)}
                    placeholder="Enter Expected Output"
                    className={""}
                  />
                  {errors.testcases?.[index]?.output && (
                    <p className="text-xs text-red-600 mt-1 ml-1">
                      {errors.testcases[index].output.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {SUPPORT_LANGUAGE.map((language) => (
          <div key={language}>
            <div className="bg-[var(--card)] p-4 mt-6">
              <div className="w-full flex justify-between">
                <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
                  <Code2 className="size-7" />
                  {language}
                </h3>
              </div>
              <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Starter Code Template</h4>
                <div className="border rounded-md overflow-hidden mt-2 bg-[var(--card)] p-2">
                  <Controller
                    name={`codeSnippets.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editer
                        height="300px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: true,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          accessibilitySupport: "off",
                        }}
                      />
                    )}
                  />
                </div>
                {errors.codeSnippets?.[language] && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.codeSnippets[language].message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Reference Solution</h4>
                <div className="border rounded-md overflow-hidden mt-2 bg-[var(--card)] p-2">
                  <Controller
                    name={`referenceSolutions.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editer
                        height="300px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: true,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                </div>
                {errors.referenceSolutions?.[language] && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.referenceSolutions[language].message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Example</h4>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Input
                    </label>
                    <Textarea
                      {...register(`examples.${language}.input`)}
                      placeholder="Enter Your Example Input"
                      className={""}
                    />
                    {errors.examples?.[language]?.input && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].input.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Output
                    </label>
                    <Textarea
                      {...register(`examples.${language}.output`)}
                      placeholder="Enter Your Example Output"
                      className={""}
                    />
                    {errors.examples?.[language]?.output && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].output.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Explanation
                    </label>
                    <Textarea
                      {...register(`examples.${language}.explanation`)}
                      placeholder="Enter Your Explanation of Example"
                      className={""}
                    />
                    {errors.examples?.[language]?.explanation && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <Lightbulb className="size-7" /> Additional Information
            </h3>
          </div>
          <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
          <div className="bg-[var(--background)] p-4 rounded mt-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Constraints
                </label>
                <Textarea
                  {...register("constraints")}
                  placeholder="Enter Problem Constraints"
                  className={""}
                />
                {errors.constraints && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.constraints?.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Hints
                </label>
                <Textarea
                  {...register("hints")}
                  placeholder="Enter Hints(Optional)"
                  className={""}
                />
                {errors.hints && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.hints?.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Editorial
                </label>
                <Textarea
                  {...register("editorial")}
                  placeholder="Enter Editorial(Optional)"
                  className={""}
                />
                {errors.editorial && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.editorial?.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className={` text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer ${
              isUpdating
                ? "bg-[var(--muted-foreground)]"
                : "bg-[var(--foreground)]"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <LoaderCircle className="size-5 animate-spin mr-2" />
            ) : (
              <ChevronRight size={20} className="mr-2" />
            )}
            Edit Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProblem;
