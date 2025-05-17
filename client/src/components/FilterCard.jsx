import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  RadioGroup,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { ChevronDown, X } from "lucide-react";

const FILTERS = {
  Location: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  Industry: [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
  ],
  Salary: ["0-40k", "1-2 LPA", "2-5 LPA"],
};

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(() =>
    Object.keys(FILTERS).reduce((a, k) => ({ ...a, [k]: true }), {})
  );

  /* send query to redux */
  useEffect(() => {
    dispatch(setSearchedQuery(selected));
  }, [selected]);

  const reset = () => {
    setSelected("");
    dispatch(setSearchedQuery(""));
  };

  return (
    <aside className="w-full max-w-xs rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Filters</h2>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-sm font-medium text-rose-400 hover:underline"
        >
          <X size={14} />
          Reset
        </button>
      </div>

      {/* radio groups */}
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="space-y-4"
      >
        {Object.entries(FILTERS).map(([section, opts]) => (
          <div key={section} className="border-b border-slate-700 pb-3">
            {/* accordion header */}
            <button
              type="button"
              onClick={() =>
                setOpen((p) => ({ ...p, [section]: !p[section] }))
              }
              className="flex w-full items-center justify-between"
            >
              <span className="font-medium text-indigo-300">{section}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  open[section] ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* options */}
            {open[section] && (
              <div className="mt-3 space-y-2 pl-1">
                {opts.map((opt, i) => {
                  const id = `${section}-${i}`;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 rounded p-1 hover:bg-indigo-600/10"
                    >
                      <RadioGroupItem
                        id={id}
                        value={opt}
                        className="h-4 w-4 border-slate-400 data-[state=checked]:bg-indigo-500"
                      />
                      <Label
                        htmlFor={id}
                        className="cursor-pointer text-sm text-slate-300"
                      >
                        {opt}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </RadioGroup>
    </aside>
  );
};

export default FilterCard;
