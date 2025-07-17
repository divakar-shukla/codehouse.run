import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { addProblem } from "@/zodSchema/problem.schema";
import { useNavigate } from "react-router-dom";
import { BookOpen, RotateCw, Plus } from "lucide-react";
import FormInput from "@/components/FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};
const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
          * @param {number} n
          * @return {number}
          */
          function climbStairs(n) {
          // Write your code here
          }          

          // Parse input and execute
          const readline = require('readline');
          const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: false
          });          

          rl.on('line', (line) => {
          const n = parseInt(line.trim());
          const result = climbStairs(n);          

          console.log(result);
          rl.close();
          });`,
    PYTHON: `class Solution:
            def climbStairs(self, n: int) -> int:
                # Write your code here
                pass          

          # Input parsing
          if __name__ == "__main__":
            import sys
            
            # Parse input
            n = int(sys.stdin.readline().strip())
            
            # Solve
            sol = Solution()
            result = sol.climbStairs(n)
            
            # Print result
            print(result)`,
    JAVA: `import java.util.Scanner;          

          class Main {
            public int climbStairs(int n) {
                // Write your code here
                return 0;
            }
            
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                int n = Integer.parseInt(scanner.nextLine().trim());
                
                // Use Main class instead of Solution
                Main main = new Main();
                int result = main.climbStairs(n);
                
                System.out.println(result);
                scanner.close();
            }
          }`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
          * @param {number} n
          * @return {number}
          */
          function climbStairs(n) {
          // Base cases
          if (n <= 2) {
            return n;
          }          

          // Dynamic programming approach
          let dp = new Array(n + 1);
          dp[1] = 1;
          dp[2] = 2;          

          for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
          }          

          return dp[n];          

          /* Alternative approach with O(1) space
          let a = 1; // ways to climb 1 step
          let b = 2; // ways to climb 2 steps          

          for (let i = 3; i <= n; i++) {
            let temp = a + b;
            a = b;
            b = temp;
          }          

          return n === 1 ? a : b;
          */
          }          

          // Parse input and execute
          const readline = require('readline');
          const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: false
          });          

          rl.on('line', (line) => {
          const n = parseInt(line.trim());
          const result = climbStairs(n);          

          console.log(result);
          rl.close();
          });`,
    PYTHON: `class Solution:
            def climbStairs(self, n: int) -> int:
                # Base cases
                if n <= 2:
                    return n
                
                # Dynamic programming approach
                dp = [0] * (n + 1)
                dp[1] = 1
                dp[2] = 2
                
                for i in range(3, n + 1):
                    dp[i] = dp[i - 1] + dp[i - 2]
                
                return dp[n]
                
                # Alternative approach with O(1) space
                # a, b = 1, 2
                # 
                # for i in range(3, n + 1):
                #     a, b = b, a + b
                # 
                # return a if n == 1 else b          

          # Input parsing
          if __name__ == "__main__":
            import sys
            
            # Parse input
            n = int(sys.stdin.readline().strip())
            
            # Solve
            sol = Solution()
            result = sol.climbStairs(n)
            
            # Print result
            print(result)`,
    JAVA: `import java.util.Scanner;          

          class Main {
            public int climbStairs(int n) {
                // Base cases
                if (n <= 2) {
                    return n;
                }
                
                // Dynamic programming approach
                int[] dp = new int[n + 1];
                dp[1] = 1;
                dp[2] = 2;
                
                for (int i = 3; i <= n; i++) {
                    dp[i] = dp[i - 1] + dp[i - 2];
                }
                
                return dp[n];
                
                /* Alternative approach with O(1) space
                int a = 1; // ways to climb 1 step
                int b = 2; // ways to climb 2 steps
                
                for (int i = 3; i <= n; i++) {
                    int temp = a + b;
                    a = b;
                    b = temp;
                }
                
                return n == 1 ? a : b;
                */
            }
            
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                int n = Integer.parseInt(scanner.nextLine().trim());
                
                // Use Main class instead of Solution
                Main main = new Main();
                int result = main.climbStairs(n);
                
                System.out.println(result);
                scanner.close();
            }
          }`,
  },
};

const CreateProblem = () => {
  const navigation = useNavigate();

  const [sampleDataType, setSampleDataType] = useState("DP");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProblem),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: ["  "],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testcasesFields,
    append: appendTestcases,
    remove: removeTestcases,
    replace: replaceTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading, setIsLoading] = useState(false);

  const oonSubmit = async (value) => {
    console.log(value);
  };

  const loadSampleData = () => {
    const sampleDataType =
      sampleDataType == "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleDataType.tags.map((tag) => tag));
    replaceTestcases(sampleDataType.testcases.map((tc) => tc));
  };
  return (
    <div className="mx-auto py-8 px-4 w-full">
      <div className="flex justify-between mb-8 border-b bg-[var(--card)] px-4 py-2 rounded">
        <div className="flex items-center">
          <h2 className="text-2xl text-[var(--foreground)] ">Create Problem</h2>
        </div>
        <div className="flex gap-5 items-end">
          <button className="bg-[var(--background)] text-[var(--primary)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
            DP Problem
          </button>
          <button className="bg-[var(--background)] text-[var(--primary)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
            String Problem
          </button>
          <button className="bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
            <RotateCw size={20} className="mr-2" />
            Load problem
          </button>
        </div>
      </div>
      <form action="">
        <div className="bg-[var(--card)] p-4 flex flex-col md:flex-row md:gap-4">
          <div className="w-full">
            <div>
              <FormInput
                {...register("title")}
                type="text"
                placeholder="Enter your problem's title"
                className={"mb-6"}
              />
              {errors.title && (
                <p className="text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Select
                className="focus:outline-1 focus:outline-[var(--foreground)]"
                {...register("difficulty")}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <p className="text-xs text-red-600">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full ">
            <Textarea
              {...register("description")}
              placeholder="Enter You Problem Description"
              className={"h-full mb-6"}
            />
            {errors.difficulty && (
              <p className="text-xs text-red-600">
                {errors.difficulty.message}
              </p>
            )}
          </div>
        </div>
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between ">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <BookOpen className="size-9" />
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
          <div className="min-h-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tagFields.map((fields, index) => (
              <div key={fields.id} className="flex gap-2 items-center">
                <FormInput
                  {...register(`tags${index}`)}
                  type="text"
                  placeholder="Enter tags"
                  className={"mb-6"}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">dsbh</button>
      </form>
    </div>
  );
};

export default CreateProblem;
